var credentials = require('./dbCredentials');

var UserModel = require('./models/user');
var CategoryModel = require('./models/category');

var FeedbackModel = require('./models/feedback');

module.exports = {
  url: `mongodb://${credentials.username}:${credentials.password}@ds013260.mlab.com:13260/baraholka`,
  User: UserModel,
  Feedback: FeedbackModel,
  Category: CategoryModel
}