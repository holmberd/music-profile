/*jshint node: true */
/*jshint esversion: 6 */

'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

//require('dotenv').config();
var routes = require('./routes/index');

const PORT = process.env.PORT || '3000';

var app = express();

if (app.get('env') !== 'development') {
  app.enable('trust proxy');
}

// set the view engine to ejs
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({ 'error': { 'status': err.status, 'message': err.message, 'error': err } });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ 'error': { 'status': err.status, 'message': err.message } });
});

app.listen(PORT);
console.log("Running server on PORT:", PORT);


//module.exports = app;
