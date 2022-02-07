var request = require('request');
const logger = require('../Logger/logProducer');

require('dotenv').config({ path: '../.env' });

const TWITTER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAAH3zLQEAAAAA7nM11LIkcmJvZL9MsQ4zlBYZpmg%3DcZ97AckutD4HRM1TW99XI4hpFvk7yu3JSwWQsUNNb1CtaHy9o0';

class TwitterParams {
    constructor() { };
    setRetweet(retweet) {
        this.retweet = retweet;
    }
    setReply(reply) {
        this.reply = reply;
    }
    setLike(like) {
        this.like = like;
    }

    setFollowers(followers) {
        this.followers = followers;
    }
}

function searchTweets(query, username) {
    return new Promise(function (resolve, reject) {
        var options = {
            url: "https://api.twitter.com/2/tweets/search/recent?query=" + query + "&tweet.fields=public_metrics",
            headers: {
                'Authorization': 'Bearer ' + TWITTER_TOKEN
            }
        };
        request.get(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                result=JSON.parse(body);
                if (result.meta.result_count>0) {
                    logger.log("Found tweets for user: " + username, "INFO");
                    resolve(result);
                } else {
                    logger.log("User " + username + "'s last action was done more than 30 days ago ", "DEBUG");
                    resolve(null);
                }
            }
            else {
                logger.log("Error for user " + username + "'s tweets params search", "ERROR");
                reject(error);
            }
        });
    });
}

function viewFollowers(username) {
    return new Promise(function (resolve, reject) {
        var options = {
            url: "https://api.twitter.com/2/users/by/username/" + username + "?user.fields=public_metrics",
            headers: {
                'Authorization': 'Bearer ' + TWITTER_TOKEN
            }
        };
        request.get(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                logger.log("Found followers for user: " + username, "INFO");
                resolve(JSON.parse(body).data.public_metrics.followers_count);
            }
            else {
                logger.log("Error for user " + username + "'s followers search", "ERROR");
                reject(error);
            }
        });
    });
}

async function retrieveTwitterParams(query, username) {
    var twitterParams = new TwitterParams();
    try {
        var tweets = await searchTweets(query, username);
        var likes = 0;
        var reply = 0;
        var retweet = 0;
        if (tweets != null)
            for (const tweet of tweets.data) {
                likes += tweet.public_metrics.like_count;
                reply += tweet.public_metrics.reply_count;
                retweet += tweet.public_metrics.retweet_count;
            };
        var followers = await viewFollowers(username);

        twitterParams.setLike(likes);
        twitterParams.setReply(reply);
        twitterParams.setRetweet(retweet);
        twitterParams.setFollowers(followers);
        logger.log("Twitter metrics defined for user: " + username, "INFO");
        return twitterParams;
    } catch (error) {
        logger.log("Error while retrieving twitter params for user: " + username, "ERROR");
        twitterParams.setLike(0);
        twitterParams.setReply(0);
        twitterParams.setRetweet(0);
        twitterParams.setFollowers(0);
        return twitterParams;
    }

}

module.exports = { retrieveTwitterParams, searchTweets };