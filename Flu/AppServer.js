var express = require('express');
const fluService = require('./Service/FluService');
const cors = require('cors');
var request2server = require('request');

var app = express();

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.get('/', function (req, res) {
    res.send('flu - Version 1.0.0');
});

app.get('/influencer', async function (req, res) {

    var influencer = await fluService.defineInfluencer(req);
    res.send(influencer);
});

app.use(express.json());

app.get('/getInfluencer', async function (req, res) {
    /*  request2server({
         url: 'http://admin:admin@couchdb:5984/flu_database/' + req.query.id,
         method: 'GET',
     }, function (error, response, body) {
         if (error) {
             console.log(error);
         } else {
             res.send(body);
             console.log(response.statusCode, body);
         }
     });
     ; */
    var influencer = await fluService.getInfluencer(req);
    res.send(influencer);
});

app.get('/getAllInfluencers', async function (req, res) {
    /*    request2server({
           url: 'http://admin:admin@couchdb:5984/flu_database/_all_docs',
           method: 'GET',
       }, function (error, response, body) {
           if (error) {
               console.log(error);
           } else {
               res.send(body);
               console.log(response.statusCode, body);
           }
       });
       ; */
    var influencers = await fluService.getAllInfluencers();
    res.send(influencers);
});

app.listen(8089);