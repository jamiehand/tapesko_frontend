/*
 * combine other helpers into main page here
 */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
const URL_BASE = "http://1-dot-spatial-garage-109814.appspot.com/wikisearch?term="

var start = function(){
  /* middleware */
  app.set('port', (process.env.PORT || 6000));
  app.use(express.static(__dirname + '/public'));
  /* Parses the text as JSON and exposes the resulting object on req.body */
  app.use(bodyParser.json());

  app.setUpRoutes();

  app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
  });
}

app.setUpRoutes = function(){
  this.get('/', function(app_request, app_response) {
    var term = "javascript";
    var url = URL_BASE + term;
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);
        app_response.send(body);
      }
    });
  });

  this.get('/search', function(app_request, app_response) {
    var term = app_request.query.term;
    var url = URL_BASE + term;
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);
        app_response.send(body);
      }
    });
  });
};

exports.start = start;
