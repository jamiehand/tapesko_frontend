/*
 * combine other helpers into main page here
 */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var makeQuery = require('./makeQuery.js');

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
  // TODO show a page w/ a search bar (and the note that the app currently can
  // only search for one-word phrases at a time).
  this.get('/', function(app_request, app_response) {
    var term = "java";
    makeQuery.makeQuery(term, app_response);
  });

  this.get('/search', function(app_request, app_response) {
    var term = app_request.query.term;
    makeQuery.makeQuery(term, app_response);
  });
};

exports.start = start;
