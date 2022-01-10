var express = require('express');
var request = require('request');
const gNewsClient = require('../ExternalClients/GnewsClient');
const twitterClient= require('../ExternalClients/TwitterClient');
const logger = require('../Logger/logProducer');
var {Influencer} = require('../DomainEntities/Influencer');


function calculateFluScore(gNews, twitter) {
    var score = (4 * gNews + 6 * twitter ) / 20;
    return score;
}

function calculateTwitterScore(twitterParams) {
    var score = (4*twitterParams.like+1*twitterParams.reply+2*twitterParams.retweet+3*twitterParams.followers) / 40;
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

    var userDefinition = gNewsClient.searchGNewsNews(req.query.username);
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

    var userDefinition = twitterClient.searchTweets(req.query.q);
    userDefinition.then(function (data) {
        twitterScore = data.meta.result_count;
        return twitterScore;
    }).then(function (twitterScore) {
        var user = new Influencer();
        user.setUsername(req.query.q);
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

app.get('/influencer2', async function (req, res) {

    var twitterParams = await twitterClient.retrieveTwitterParams(req.query.twitter_query,req.query.twitter_username);
    var fullName=req.query.name+" "+req.query.surname;
    var gNewsScore = await gNewsClient.searchGNewsNews(fullName);
    var twitterScore = calculateTwitterScore(twitterParams);
    var fluScore = calculateFluScore(gNewsScore,twitterScore);
    var influencer = new Influencer(req.query.name,req.query.surname,fullName,req.query.twitter_username,twitterParams,gNewsScore,twitterScore,fluScore);

    res.send(influencer);
});

app.listen(8089);