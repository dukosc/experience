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

app.get('/', function(req, res) {
  res.sendFile('app');
});



http.listen(port);



io.on('connection', function(socket) {
  console.log("WE CONNECTED");
  User.find({}, function(err, data) {
    console.log(data);
    socket.emit('all:users', data);
  });
  socket.on('complete:goal', function(val) {
    console.log(User.stats);
    console.log('completed goal', val);
    var item = val.completedGoals.pop();
    var svalue = val.svalue;
    var evalue = val.evalue;
    var dvalue = val.dvalue;
    var ivalue = val.ivalue;
    var wvalue = val.wvalue;
    User.findByIdAndUpdate(
      val._id, {
        $push: {
          completedGoals: item
        },
      }, {
        safe: true,
        upsert: true,
        new: true
      },
      function(err, pitch) {
        if (err) {
          console.log("UPDATE ERR", err);
          throw err;
        }
        //  socket.emit('new:goal', user);
      }
    );
    User.findByIdAndUpdate(
      val._id, {
        $pull: {
          currGoals: item
        },
      }, {
        safe: true,
        upsert: true,
        new: true
      },
      function(err, pitch) {
        if (err) {
          console.log("UPDATE ERR", err);
          throw err;
        }
        //  socket.emit('new:goal', user);
      }
    );
    User.findByIdAndUpdate(
      val._id, {
        $set: {
          stats: {
            strength: val.stats.strength + svalue,
            endurance: val.stats.endurance + evalue,
            dexterity: val.stats.dexterity + dvalue,
            intelligence: val.stats.intelligence + ivalue,
            wisdom: val.stats.wisdom + wvalue
          }
        },
      }, {
        safe: true,
        upsert: true,
        new: true
      },
      function(err, pitch) {
        if (err) {
          console.log("UPDATE ERR", err);
          throw err;
        }
        //  socket.emit('new:goal', user);
      }
    );
  });
  socket.on('new:goal', function(val) {
    console.log('new goal', val);

    User.findByIdAndUpdate(
      val._id, {
        $push: {
          currGoals: val.currGoals.pop()
        }
      }, {
        safe: true,
        upsert: true,
        new: true
      },
      function(err, pitch) {
        if (err) {
          console.log("UPDATE ERR", err);
          throw err;
        }
        //  socket.emit('new:goal', user);
      }
    );
  });
  socket.on('new:user', function(val) {
    console.log(val);
    var user = new User({
      username: val.username,
      password: val.password,
      stats: {
        strength: 10,
        endurance: 10,
        dexterity: 10,
        intelligence: 10,
        wisdom: 10,
      },
      currGoals: [],
      completedGoals: []
    });
    console.log(user.stats);
    user.save(function(err, data) {
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
