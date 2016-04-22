var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({

  username: {
    type: String
  }

}, {
  collection: 'fs_users'
})

module.exports = mongoose.model('User', userSchema);