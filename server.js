var express = require('express');
var port = process.env.PORT || 3001;
var app = express();
var http = require('http').Server(app);
var mongoose = require('mongoose');
var mongoConfig = process.env.MONGOLAB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/test';
// var User = require('./User');

mongoose.connect(mongoConfig);


mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
});


app.use(express.static(__dirname + "/app"))

app.get('/', function(req,response) {
  response.sendFile('app');
});


http.listen(port);


console.log('WE ARE RUNNING ON PORT:' + port);
