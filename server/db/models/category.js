var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

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
  parent: {
    type: mongoose.Schema.ObjectId,
    rel: 'Category',
    default: null
  },  
  children: [{
    type: mongoose.Schema.ObjectId,
    rel: 'Category'
  }]

}, {
  collection: 'fs_categories'
})

categorySchema.plugin(deepPopulate);

module.exports = mongoose.model('Category', categorySchema);