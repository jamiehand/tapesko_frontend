/*
 * combine other helpers into main page here
 */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

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
  this.get('/', function(request, response) {
    response.send('hello world!');
  });

  // TODO this
  // this.post('/search', function(request, response) {
  //   makeQuery.makeQuery(request, response);
  // });
};

exports.start = start;
