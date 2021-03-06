var http = require('http');
var fs = require('fs');
var formidable = require('formidable');
var util = require('util');

var server = http.createServer(function(req, res) {
  if (req.method.toLowerCase() == 'get') {
    displayForm(res);
  } else if (req.method.toLowerCase() == 'post') {
    processAllFieldsOfTheForm(req, res);
    // processFormFieldsIndividual(req, res);
  }
});

var displayForm = function(res) {
  fs.readFile('form.html', function(err, data) {
    res.writeHead(200, {
      'Content-Type': 'text/html',
      // 'Content-Length': data.length
    });
    res.write(data);
    res.write("Hello world!");
    res.end();
  });
}

var processAllFieldsOfTheForm = function(req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, files) {
    res.writeHead(200, {
      // 'content-type': 'text/plain'
      'content-type': 'text/html'
    });
    res.write('received the data:\n\n');

    res.end(util.inspect({
      fields: fields,
      files: files
    }));
  });
}

var processFormFieldsIndividual = function(req, res) {
  var fields = [];
  var form = new formidable.IncomingForm();
  form.on('field', function(field, value) {
    console.log(field);
    console.log(value);
    fields[field] = value;
  });

  form.on('end', function() {
    res.writeHead(200, {
      'content-type': 'text/plain'
    });
    res.write('received the data:\n\n');
    res.end(util.inspect({
      fields: fields
    }));
  });
  form.parse(req);
}

server.listen(1185);
console.log("server listening 1185");
