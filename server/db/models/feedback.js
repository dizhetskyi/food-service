var
  mongoose = require('mongoose'),
  feedBackSchema = new mongoose.Schema({
    content: {
      type: String
    },
    feedbackType: {
      type: String,
      default: 'Question'
    },
    status: {
      type: String,
      default: 'New'
    },
    date_added: {
      type: Date,
      default: Date.now
    },
    customer: {
    },
    __v: {
      type: Number,
      default: 0
    }
  });

  module.exports = mongoose.model('fs_feedbacks', feedBackSchema);
