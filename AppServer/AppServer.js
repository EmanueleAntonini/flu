var express = require('express');
const { json } = require('express/lib/response');
const res = require('express/lib/response');
const GNEWS_TOKEN = '257ef7e1e8f8362a1397ae3a16f1c56e';
var request = require('request');

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

app.listen(8089);