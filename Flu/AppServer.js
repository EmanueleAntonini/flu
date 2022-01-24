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
/**
 * @api {get} /influencer Request Influencer information
 * @apiName GetInfluencer
 *
 * @apiParam {String} [name] Name of the Influencer
 * @apiParam {String} [surname] Surname of the Influencer
 * @apiParam {String} [twitter_username] TwitterUsername of the Influencer
 *
 * @apiSuccess {String} name Name of the Influencer.
 * @apiSuccess {String} surname Surname of the Influencer.
 * @apiSuccess {String} fullName Complete name of the Influencer.
 * @apiSuccess {String} twitterUsername TwitterUsername of the Influencer.
 * @apiSuccess {Number[]} twitterParams Array of Twitter Params (like, reply, retweet, followers)
 * @apiSuccess {Number} gNewsScore Score on GNews of the Influencer
 * @apiSuccess {Number} twitterScore Score on Twitter of the Influencer
 * @apiSuccess {Number} fluScore Total Score of the Influencer
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
            "name": "Luigi",
            "surname": "Di Maio",
            "fullName": "Luigi Di Maio",
            "twitterUsername": "luigidimaio",
            "twitterParams": {
                "like": 632,
                "reply": 538,
                "retweet": 146,
                "followers": 745547
            },
            "gNewsScore": 423,
            "twitterScore": 55999.975,
            "fluScore": 16884
        }
 * @apiError {String} Invalid Invalid params for the request
 * @apiError {String} ERROR Error while defining user     
*/

/**
 * @api {get} /getInfluencer Request Document on Flu_database of the Influencer
 * @apiName GetDocOfInfluencer
 * @apiParam {String} [id] TwitterUsername of the Influencer
 * 
 * @apiSuccess {String[]} Returns the document of the Influencer
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {"_id":"luigidimaio","_rev":"1-73f3753cb22bb3dbdb704cc9344973be",
 *      "name":"Luigi","surname":"Di Maio",
 *      "fullName":"Luigi Di Maio","twitterUsername":"luigidimaio",
 *      "twitterParams":{"like":632,"reply":538,"retweet":146,
 *      "followers":745549},"gNewsScore":423,"twitterScore":56000.125,"fluScore":16884}
 * 
 * @apiError {String} ERROR Error while getting user
 */

/**
 * @api {get} /getAllInfluencer Request All Document on Flu_database
 * @apiName GetDocOfAllInfluencer
 * 
 * @apiSuccess {String} total_rows Number of the document on Flu_database
 * @apiSuccess {String} offset Index of the first row
 * @apiSuccess {String[]} rows Returns all the document on Flu_database
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
      {"total_rows":2,"offset":0,"rows":[
       {"id":"luigidimaio","key":"luigidimaio","value":{"rev":"1-73f3753cb22bb3dbdb704cc9344973be"}},
       {"id":"nzingaretti","key":"nzingaretti","value":{"rev":"1-f791acc61a83cd3aa7fdcfeceab9d65f"}}
       ]}
 * 
 * @apiError {String} ERROR Error during the request
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