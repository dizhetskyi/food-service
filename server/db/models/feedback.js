var
  mongoose = require('mongoose'),
  feedBackSchema = new mongoose.Schema({
    userName: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now
    },
    content: {
      type: String
    },
    status: {
      type: Number
    }
  });

  module.exports = mongoose.model('fs_feeeeds', feedBackSchema);
