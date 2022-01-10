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

app.listen(8089);