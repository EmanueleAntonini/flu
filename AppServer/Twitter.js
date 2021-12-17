var express = require('express');
var request = require('request');
var oauth = require('oauth');
var Twitter = require('./twitter');

/* Twitter ConsumerKey e ConsumerSecret */
var _twitterConsumerKey = "hiH7HzRjlXNEN9hO3B6N4r8pk";
var _twitterConsumerSecret = "JQVxxgqKCQXvGIAAZEwdydfWtfH2TbU2IWib6g1OX7fqJOOqLY";


/* Istanza di oAuth */
var consumer = new oauth.OAuth(
    "https://api.twitter.com/oauth/request_token", "https://api.twitter.com/oauth/access_token",
    _twitterConsumerKey, _twitterConsumerSecret, "1.0A", "http://192.168.56.1:8080/sessions/callback", "HMAC-SHA1");

/* Imposta modulo express per le richieste http */
/* express gestisce ogni richiesta GET e POST inviata dal client tramite funzioni app.get e app.post */
var app = express();
app.use(bodyParser.urlencoded({ extended: false })); // per ispezionare il contenuto della richiesta (body)
app.use(bodyParser.json());

//* --------------------------------- funzioni oAuth di Twitter ------------------------------------------- */
/* Consumer ottiene autorizzazione da parte dell'utente tramite requestToken */
app.get('/sessions/connect', function(req, res){
	consumer.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results) {
		if (error) {
      log("[ERROR AUTHORIZE] Error getting Oauth request token, impossible to request authorization");
			res.redirect('/login');
		} else { 
			req.session.oauthRequestToken = oauthToken;
			req.session.oauthRequestTokenSecret = oauthTokenSecret;
      /* reindirizza alla pagina di autorizzazione, utente autorizza => server accede a dati (username) */
			res.redirect("https://api.twitter.com/oauth/authorize?oauth_token="+oauthToken);
      log("[AUTHORIZE] Redirecting to Twitter authorization page.");
    }
	});
});
/* consumer ottiene l'accesso alle risorse per conto dell'utente mediante accessToken
      URL_callback: https://192.168.56.1:8080/sessions/callback */
app.get('/sessions/callback', function(req, res){
	consumer.getOAuthAccessToken(req.session.oauthRequestToken, req.session.oauthRequestTokenSecret,
              req.query.oauth_verifier, function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
		if (error) {
      log("[NO AUTHORIZE] Error getting Oauth access token, authorization negated by user.");
			res.redirect('/login');
		} else {
			req.session.oauthAccessToken = oauthAccessToken;
			req.session.oauthAccessTokenSecret = oauthAccessTokenSecret;
      log("[LOGIN] Login done, authorization obtained");
			res.redirect('/index');
		}
	});
});

/* Logout da Twitter */
app.get('/logout', function(req, res){
  log("[LOGOUT] Logout effettuato!");
	req.session.destroy();
	res.redirect('/index');
});

/* Richiesta automatica per verificare se l'utente è connesso e in caso ottenere il suo username */
app.post('/username', function(req, res) {
	consumer.get("https://api.twitter.com/1.1/account/verify_credentials.json", req.session.oauthAccessToken,
  req.session.oauthAccessTokenSecret, function (error, data, response) {
		if (error) {
			res.end();
		} else {
      var user = (JSON.parse(data)).screen_name;
			res.send(inspect(user));
      log("[USERNAME] " + user);
		}
	});
});

app.listen(8090);