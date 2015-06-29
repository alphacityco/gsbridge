var express = require('express');
var app     = express();
var bodyParser = require('body-parser');

var Spreadsheet = require('edit-google-spreadsheet');
var config      = require('./config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/spreadsheet', function (req, res) {
  var token = req.body.token;
  var pageName  = req.body.pageName;

  // pseudo-login ::::::::::::::::::::::
  var page;
  if (!token || !pageName) {
    return res.send(404);
  }
  else {

    page = config.pages[pageName];

    if (!page){
      return res.send(404);
    }
    else {

      if (page.token !== token){
        return res.send(404);
      }
      console.log("Authorised request!");

    }

  }
  // pseudo-login ::::::::::::::::::::::

  // TODO save form data in excel file!
  var sheetId = req.body.sheetId;
  var worksheetId = req.body.worksheetId;

  // After executing Spreadsheet.load with debug:true, you can see as an advice the values of spreadsheetId and worksheetId
  Spreadsheet.load({
    debug: true,
    spreadsheetId: sheetId,
    worksheetId: worksheetId,
    // spreadsheetName: 'test_ss',
    // worksheetName: 'Sheet1',
    oauth2: config.oauth2
  }, function (err, spreadsheet) {
    if(err) throw err;

    spreadsheet.receive(function(err, rows, info) {
      if(err) throw err;

      res.send({rows: rows});
    });

  });

});

app.get('/spreadsheet', function (req, res) {

  // After executing Spreadsheet.load with debug:true, you can see as an advice the values of spreadsheetId and worksheetId
  Spreadsheet.load({
    debug: true,
    spreadsheetId: '1iY6NDn7jIR-5KO7lPLO1ybP2Jj5_RM8ACOJA4ZuXX-Y',
    worksheetId: 'od6',
    // spreadsheetName: 'test_ss',
    // worksheetName: 'Sheet1',
    oauth2: config.oauth2
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
