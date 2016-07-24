/*
 * helper for making queries
 */

var request = require('request');
var sendResults = require('./sendResults.js');

const URL_BASE = "http://1-dot-spatial-garage-109814.appspot.com/wikisearch?term="

var makeQuery = function(term, app_response) {
  var url = URL_BASE + term;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      // TODO do this with sendResults
      sendResults.sendResults(body, app_response);
    }
  });
};

exports.makeQuery = makeQuery;
