var express = require('express');
const fluService = require('../Service/FluService')

var app = express();

app.get('/influencer', async function (req, res) {

    var influencer = await fluService.defineInfluencer(req);
    res.send(influencer);

});

app.listen(8089);