const gNewsClient = require('../ExternalClients/GnewsClient');
const twitterClient = require('../ExternalClients/TwitterClient');
var { Influencer } = require('../DomainEntities/Influencer');
const logger = require('../Logger/logProducer');

function validateRequest(req) {
    if (!req.query.twitter_username || req.query.twitter_username.length == 0 || !req.query.name || req.query.name.length == 0 || !req.query.surname || req.query.surname.length == 0)
        return false;
    return true;
}

function calculateFluScore(gNews, twitter) {
    var score = (4 * gNews + 6 * twitter) / 20;
    return score;
}

function calculateTwitterScore(twitterParams) {
    var score = (4 * twitterParams.like + 1 * twitterParams.reply + 2 * twitterParams.retweet + 3 * twitterParams.followers) / 40;
    return score;
}

async function defineInfluencer(req) {
    if (!validateRequest(req)) {
        return "Invalid params for the request";
    }
    try {
        var twitterParams = await twitterClient.retrieveTwitterParams("from:" + req.query.twitter_username, req.query.twitter_username);
        var fullName = req.query.name + " " + req.query.surname;
        var gNewsScore = await gNewsClient.searchGNewsNews(fullName);
        var twitterScore = calculateTwitterScore(twitterParams);
        var fluScore = calculateFluScore(gNewsScore, twitterScore);
        var influencer = new Influencer(req.query.name, req.query.surname, fullName, req.query.twitter_username, twitterParams, gNewsScore, twitterScore, fluScore);
        return influencer;
    } catch (error) {
        logger.log("Error while defining user: " + req.query.twitter_username , "ERROR");
    }
}


module.exports = { defineInfluencer };