
var request = require('request');
const GNEWS_TOKEN = '257ef7e1e8f8362a1397ae3a16f1c56e';

function searchGNewsNews(query) {
  return new Promise(function (resolve, reject) {
      var options = { url: "https://gnews.io/api/v4/search?q=" + query + "&token=" + GNEWS_TOKEN };
      request.get(options, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              resolve(JSON.parse(body).totalArticles);
          }
          else {
              logger.log("Error with message: "+error.message+" for user: "+username+"'s GNews search","ERROR");
              reject(error);
          }
      });
  });
}

module.exports = {searchGNewsNews};