var express = require('express');
const fluService = require('./Service/FluService')
var request2server = require('request');

var app = express();

app.get('/', function(req,res){
    res.send('flu - Version 1.0.0'); 
});

app.get('/influencer', async function (req, res) {

    var influencer = await fluService.defineInfluencer(req);
    res.send(influencer);


});

app.use(express.json());

app.get('/getInfluencer', function(req, res){
    request2server({
        url: 'http://admin:admin@127.0.0.1:5984/flu_database/'+req.query.id,
        method: 'GET',
    }, function(error, response, body){
        if(error) {
            console.log(error);
        } else {
            res.send(response.statusCode+" "+body)
            console.log(response.statusCode, body);
        }
    });
  ;
});

app.get('/getAllInfluencers', function(req, res){
    request2server({
        url: 'http://admin:admin@127.0.0.1:5984/flu_database/_all_docs',
        method: 'GET',
    }, function(error, response, body){
        if(error) {
            console.log(error);
        } else {
            res.send(response.statusCode+" "+body)
            console.log(response.statusCode, body);
        }
    });
  ;
});

app.listen(8089);