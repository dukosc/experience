var express = require('express');
var port = process.env.PORT || 3001;
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var mongoConfig = process.env.MONGOLAB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/experience';
var User = require('./User');

mongoose.connect(mongoConfig);


mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
});


app.use(express.static(__dirname + "/app"))

app.get('/', function(req,res) {
  res.sendFile('app');
});



http.listen(port);



io.on('connection', function(socket) {
  console.log("WE CONNECTED");
  User.find({},function(err,data) {
      console.log(data);
      socket.emit('all:users', data);
    });
  socket.on('new:user', function(val) {
    console.log('val', val);
    var user = new User({
      username: val.username,
      password: val.password,
      stats: val.stats,
      currGoals: val.currGoals,
      completedGoals: val.completedGoals
    });
    user.save(function(err,data) {
    if (err) {
      console.log("OH FUCK", err);
      return;
    }
    console.log(" YAY", data);
    io.emit('new:user', data);
  });
  });
});

console.log("CONNECTED ON PORT", port);
