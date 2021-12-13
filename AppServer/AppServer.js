var express = require('express');
const axios = require('axios').default;
const GNEWS_TOKEN = '257ef7e1e8f8362a1397ae3a16f1c56e';


function searchGNewsNews(query) {
    var url = "https://gnews.io/api/v4/search?q=" + query + "&token=" + GNEWS_TOKEN;
    axios.get(url).
        then(function (response) {
            console.log(response.data.totalArticles);
        })
}

var app = express();

app.get('/utente', function (req, res) {
    res.send(searchGNewsNews(req.query.username));
})

app.listen(8089);