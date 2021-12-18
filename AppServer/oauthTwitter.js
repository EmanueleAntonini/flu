
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('express-logger');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var inspect = require('util-inspect');
var oauth = require('oauth');
var request = require('request')
var Twitter = require('twitter');
var extend = require('deep-extend');
var app = express();
var VERSION = '1.7.1'

var fs = require('fs');
var _twitterConsumerKey = "hiH7HzRjlXNEN9hO3B6N4r8pk";
var _twitterConsumerSecret = "JQVxxgqKCQXvGIAAZEwdydfWtfH2TbU2IWib6g1OX7fqJOOqLY";


function consumer() {
    return new oauth.OAuth(
        "https://twitter.com/oauth/request_token", "https://twitter.com/oauth/access_token",
        _twitterConsumerKey, _twitterConsumerSecret, "1.0A", "http://127.0.0.1:8080/sessions/callback", "HMAC-SHA1");
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger({ path: "log/express.log"}));
app.use(cookieParser());
app.use(session({ secret: "very secret", resave: false, saveUninitialized: true}));

app.get('/', function(req, res){
    res.send('Hello World');
});

app.get('/sessions/connect', function(req, res){
    consumer().getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results){
        if (error) {
            console.log(error)
            res.status(500).send("Error getting OAuth request token : " +error.toString());
        } else {
            req.session.oauthRequestToken = oauthToken;
            console.log(oauthToken)
            console.log(oauthTokenSecret)
            req.session.oauthRequestTokenSecret = oauthTokenSecret;
            res.redirect("https://twitter.com/oauth/authorize?oauth_token="+req.session.oauthRequestToken);
        }
    });
});

app.get('/sessions/callback', function(req, res){
    
});

app.listen(8080) 