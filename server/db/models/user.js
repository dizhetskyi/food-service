var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({

  username: {
    type: String
  }

})

module.exports = mongoose.model('fs_users', userSchema);