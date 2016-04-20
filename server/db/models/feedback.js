var mongoose = require('mongoose');

var feedbackSchema = new mongoose.Schema({
  text: {
    type: String
  },
  mark: {
    type: Number
  }
})

module.exports = mongoose.model('fs_feedbacks', feedbackSchema);
