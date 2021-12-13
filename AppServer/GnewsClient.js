
var xmlHttp= require ('xmlHttp');
const GNEWS_TOKEN = '257ef7e1e8f8362a1397ae3a16f1c56e';

function searchGNewsNews(query){
  var url="https://gnews.io/api/v4/search?q=" + query + "&token=" + GNEWS_TOKEN;
  var req= new XMLHttpRequest();
  req.open( "GET", url , false );
  req.send( null );
  return req.response;
}

export{searchGNewsNews};