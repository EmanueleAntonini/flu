const { query } = require('express');
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
    setId(id){
        this.id = id;
    }
    setRetweet(retweet){
        this.retweet = retweet;
    }
    setReply(reply){
        this.reply = reply;
    }
    setLike(like){
        this.like = like;
    }
    setFollower(follower){
        this.follower = follower;
    }
    setFluScore(fluScore) {
        this.fluScore = fluScore;
    }
}

function calculateFluScore(gNews, twitter) {
    var score = (7 * gNews + 10 * twitter ) / 20;
    return score;
}

function stampTweet(tweet) {
    var stamp = tweet;
    return stamp;
}
 function listTweet(tweet) {
     var listTweet = [];
     listTweet.push(tweet);
     return listTweet;
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
            url: "https://api.twitter.com/2/tweets/search/recent?query=" + query + "&tweet.fields=public_metrics" ,
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

function viewFollower(path) {
    return new Promise(function (resolve, reject) {
        var options = {
            url: "https://api.twitter.com/2/users/by/username/:username?user.fields=public_metrics" ,
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
    }).catch(error => console.log(error.message));
});

app.get('/id', function (req, res) {

    var userDefinition = searchTweets(req.query.username);
    userDefinition.then(function (data) {
        for (var i=0; i < data.meta.result_count; ++i){
            idTweet = data.data[i].id;
            return idTweet;
        }
    }).then(function (idTweet) {
        var user = new Influencer();
        user.setUsername(req.query.username);
        user.setId(listTweet(idTweet));
        res.send(user);
    }).catch(error => console.log(error.message));
});

app.get('/retweet', function (req, res) {

    var userDefinition = searchTweets(req.query.username);
    userDefinition.then(function (data) {
        retweetCount = data.data[0].public_metrics.retweet_count;
        return retweetCount;
    }).then(function (retweetCount) {
        var user = new Influencer();
        user.setUsername(req.query.username);
        user.setRetweet(listTweet(retweetCount));
        res.send(user);
    }).catch(error => console.log(error.message));
});

app.get('/reply', function (req, res) {

    var userDefinition = searchTweets(req.query.username);
    userDefinition.then(function (data) {
        replyCount = data.data[0].public_metrics.reply_count;
        return replyCount;
    }).then(function (replyCount) {
        var user = new Influencer();
        user.setUsername(req.query.username);
        user.setReply(stampTweet(replyCount));
        res.send(user);
    }).catch(error => console.log(error.message));
});

app.get('/like', function (req, res) {

    var userDefinition = searchTweets(req.query.username);
    userDefinition.then(function (data) {
        likeCount = data.data[0].public_metrics.like_count;
        return likeCount;
    }).then(function (likeCount) {
        var user = new Influencer();
        user.setUsername(req.query.username);
        user.setLike(stampTweet(likeCount));
        res.send(user);
    }).catch(error => console.log(error.message));
});

app.get('/follower/', function (req, res) {

    var userDefinition = viewFollower(req.path.username);
    userDefinition.then(function (data) {
        followerCount = data.public_metrics.followers_count;
        return followerCount;
    }).then(function (followerCount) {
        var user = new Influencer();
        user.setUsername(req.path.username);
        user.set(stampTweet(followerCount));
        res.send(user);
    }).catch(error => console.log(error.message));
});


app.get('/provaLog',function(req,res){
    logger.log('ciao','debug');
})

app.listen(8089);