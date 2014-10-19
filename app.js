
/**
 * Module dependencies.
 */
var express = require('express');
var reservations = require('./routes/reservations');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

// Connect to local MongoDB
var dbUrl = process.env.MONGOHQ_URL || 'mongodb://localhost/opentable';

mongoose.connect(dbUrl);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to MongoDB'));
db.once('open', function (){
  
  // Initialize express app
  var app = express();

  // all environments
  app.set('port', process.env.PORT || 3000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

  // development only
  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }

  require('./routes/index')(app);

  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
});
