var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var types = [
  'QUESTION',
  'COMPLAINT',
  'PROPOSAL'
]

var statuses = [
  'NEW',
  'PENDING',
  'CLOSED'
]

var feedbackSchema = new Schema({
  customer: {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String
    },
    email: {
      type: String
    },
    userId: {
      type: Schema.Types.ObjectId
    }
  },
  date_added: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: statuses,
    default: statuses[0],
    require: true
  },
  feedbackType: {
    type: String,
    enum: types,
    default: types[0],
    require: true
  },
  content: {
    type: String,
    require: true
  }
}, {
  collection: 'fs_feedbacks'
})

module.exports = mongoose.model('Feedback', feedbackSchema);
