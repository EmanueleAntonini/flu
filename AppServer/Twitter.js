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


//* Server effettua l'oAuth tramite la richiesta twitterlogin */
app.get('/twitterlogin', function(req,res) {
	//verifica le credenziali: GET account/verify_credentials
	  consumer.get("https://api.twitter.com/1.1/account/verify_credentials.json", req.session.oauthAccessToken, req.session.oauthAccessTokenSecret, function (error, data, response) {
		  if (error) {
			  res.redirect('/sessions/connect');
		  } else {
			  res.redirect('/index');
		  }
	  });
  });

  app.get('/sessions/connect', function(req, res){
	consumer.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results) {
		if (error) {
			res.redirect('/login');
		} else { 
			req.session.oauthRequestToken = oauthToken;
			req.session.oauthRequestTokenSecret = oauthTokenSecret;
      /* reindirizza alla pagina di autorizzazione, utente autorizza => server accede a dati (username) */
			res.redirect("https://api.twitter.com/oauth/authorize?oauth_token="+oauthToken);
    }
	});
});

app.listen(8089);