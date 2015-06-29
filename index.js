var express = require('express');
var app     = express();

var Spreadsheet = require('edit-google-spreadsheet');
var oauth2      = require('./oauth2');

app.get('/spreasheet', function (req, res) {

  Spreadsheet.load({
    debug: true,
    spreadsheetName: 'test_ss',
    worksheetName: 'Sheet1',
    oauth2: oauth2
  }, function (err, spreadsheet) {
    if(err) throw err;

    spreadsheet.receive(function(err, rows, info) {
      if(err) throw err;

      res.send({rows: rows});
    });

  });

});

var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log('Google Spreadsheet Bridge app listening at http://localhost:%s', port);
});
