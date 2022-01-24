var express = require('express');
const fluService = require('./Service/FluService');
const cors = require('cors');
var request2server = require('request');

var app = express();

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(express.json());

app.use(cors(corsOptions));

/**
 * @api {get} / Get Flu version
 * @apiName Flu Version
 * @apiSuccess {String} Actual Flu version.
 */
app.get('/', function (req, res) {
    res.send('flu - Version 1.0.0');
});

app.get('/influencer', async function (req, res) {

    var influencer = await fluService.defineInfluencer(req);
    res.send(influencer);
});

app.get('/getInfluencer', async function (req, res) {
    var influencer = await fluService.getInfluencer(req);
    res.send(influencer);
});

app.get('/getAllInfluencers', async function (req, res) {
    var influencers = await fluService.getAllInfluencers();
    res.send(influencers);
});

app.listen(8089);