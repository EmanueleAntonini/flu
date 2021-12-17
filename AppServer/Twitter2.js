var express = require('express');
const { json } = require('express/lib/response');
const res = require('express/lib/response');
var request = require('request');
var oauth = require('oauth');
var Twitter = require('./twitter');

/* Twitter ConsumerKey e ConsumerSecret */
var _twitterConsumerKey = "hiH7HzRjlXNEN9hO3B6N4r8pk";
var _twitterConsumerSecret = "JQVxxgqKCQXvGIAAZEwdydfWtfH2TbU2IWib6g1OX7fqJOOqLY";


/* Istanza di oAuth */
function consumer(facilities) {
    return new oauth.OAuth(
        "https://twitter.com/oauth/request_token", "https://twitter.com/oauth/access_token",
        _twitterConsumerKey, _twitterConsumerSecret, "1.0A", "http://127.0.0.1:8080/sessions/callback?facilities=" + facilities, "HMAC-SHA1");
}