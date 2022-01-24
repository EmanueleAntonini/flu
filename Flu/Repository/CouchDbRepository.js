var request = require('request');
const logger = require('../Logger/logProducer');



function putInfluencer(influencer) {
    request({
        url: 'http://admin:admin@couchdb:5984/flu_database/' + influencer.twitterUsername,
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(influencer)

    }, function (error, response, body) {
        if (error) {
            logger.log("Error while saving user: " + influencer.twitterUsername, "ERROR");
        }
        else{
            logger.log("Saved user: " + influencer.twitterUsername, "INFO");
        }
    });
}


function getInfluencer(query) {
    return new Promise(function (resolve, reject) {
        request({
            url: 'http://admin:admin@couchdb:5984/flu_database/' + query,
            method: 'GET',
        }, function (error, response, body) {
            if (error) {
                logger.log("Error while getting user: " + query + "'s GNews search", "ERROR");
                reject(error);
            } else {
                resolve(body);
            }
        });
        ;
    });
}

function getAllInfluencers() {
    return new Promise(function (resolve, reject) {
        request({
            url: 'http://admin:admin@couchdb:5984/flu_database/_all_docs',
            method: 'GET',
        }, function (error, response, body) {
            if (error) {
                logger.log("Error during the request", "ERROR");
                reject(error);
            } else {
                resolve(body);
            }
        });
        ;
    });
}

module.exports = { putInfluencer, getInfluencer, getAllInfluencers };