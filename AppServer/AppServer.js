var express = require('express');
const fluService = require('../Service/FluService')
var request2server = require('request');

var app = express();

app.get('/influencer', async function (req, res) {

    var influencer = await fluService.defineInfluencer(req);
    res.send(influencer);


});

app.use(express.json());

app.get('/get', function(req, res){

    request2server({
        url: 'http://admin:admin@127.0.0.1:5984/flu_database/1', //URL to hit
        //qs: {from: 'blog example', time: +new Date()}, //Query string data
        method: 'GET',
        //headers: {
        //    'Content-Type': 'MyContentType',
        //    'Custom-Header': 'Custom Value'
        //},
        //body: 'Hello Hello!' //Set the body as a string
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

app.get('/put', function(req, res){

    console.log(req.query);
    /*
    body1={
        "name": "mario",
        "surname": "vitaletti"
    };
    */
    request2server({
        url: 'http://admin:admin@127.0.0.1:5984/flu_database/'+req.query.id, 
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: '{"fluScore": }' + score
        //body: JSON.stringify(body1)
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