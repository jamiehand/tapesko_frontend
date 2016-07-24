/*
 * helper for sending query results
 */

var sendResults = function(body, app_response) {
  app_response.send(body);
};

exports.sendResults = sendResults;
