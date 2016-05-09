var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  order: {
    type: Number,
    default: 0
  },
  deleted: {
    type: Boolean,
    default: false
  },
  categories: {
    type: mongoose.Schema.ObjectId,
    rel: 'Category'
  }

}, {
  collection: 'fs_categories'
})

module.exports = mongoose.model('Category', categorySchema);