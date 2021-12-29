var express = require('express');
const { json } = require('express/lib/response');
const res = require('express/lib/response');
const GNEWS_TOKEN = '257ef7e1e8f8362a1397ae3a16f1c56e';
const TWITTER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAAH3zLQEAAAAA7nM11LIkcmJvZL9MsQ4zlBYZpmg%3DcZ97AckutD4HRM1TW99XI4hpFvk7yu3JSwWQsUNNb1CtaHy9o0';
var request = require('request');
const logger = require('../Logger/logProducer.js');

class Influencer {
    constructor() { };
    setUsername(username) {
        this.username = username;
    }
    setFluScore(fluScore) {
        this.fluScore = fluScore;
    }
}

function calculateFluScore(gNews, twitter) {
    var score = (7 * gNews + 10 * twitter) / 20;
    return score;
}

function searchGNewsNews(query) {
    return new Promise(function (resolve, reject) {
        var options = { url: "https://gnews.io/api/v4/search?q=" + query + "&token=" + GNEWS_TOKEN };
        request.get(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(JSON.parse(body));
            }
            else {
                reject(error);
            }
        });
    });
}

function searchTweets(query) {
    return new Promise(function (resolve, reject) {
        var options = {
            url: "https://api.twitter.com/2/tweets/search/recent?query=" + query,
            headers: {
                'Authorization': 'Bearer ' + TWITTER_TOKEN
            }
        };
        request.get(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(JSON.parse(body));
            }
            else {
                reject(error);
            }
        });
    });
}

var app = express();

app.get('/influencer', function (req, res) {

    var userDefinition = searchGNewsNews(req.query.username);
    userDefinition.then(function (data) {
        gNewsScore = data.totalArticles;
        return gNewsScore;
    }).then(function (gNewsScore) {
        var user = new Influencer();
        user.setUsername(req.query.username);
        user.setFluScore(calculateFluScore(gNewsScore, 0));
        res.send(user);
    }
    )

});

app.get('/twitter', function (req, res) {

    var userDefinition = searchTweets(req.query.username);
    userDefinition.then(function (data) {
        twitterScore = data.meta.result_count;
        return twitterScore;
    }).then(function (twitterScore) {
        var user = new Influencer();
        user.setUsername(req.query.username);
        user.setFluScore(calculateFluScore(0, twitterScore));
        res.send(user);
    }
    ).catch(error => console.log(error.message));

});

app.get('/provaLog',function(req,res){
    logger.log('ciao','debug');
})

app.listen(8089);