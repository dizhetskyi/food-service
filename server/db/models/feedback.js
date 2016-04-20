var
  mongoose = require('mongoose'),
  feedBackSchema = new mongoose.Schema({
    userName: {
      type: String,
      required: true
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

  module.exports = mongoose.model('fs_feeed', feedBackSchema);
