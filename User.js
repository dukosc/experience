var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: {type: String},
  password: {type: String},
  stats: {type: Object},
  currGoals: {type: Object},
  completedGoals: {type: Object}
});

var User = mongoose.model("User", userSchema);

module.exports = User;
