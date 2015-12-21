var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: {type: String},
  password: {type: String},
  stats: {type: Object},
  currGoals: {type: Array},
  completedGoals: {type: Array}
});

var User = mongoose.model("User", userSchema);

module.exports = User;
