var credentials = require('./dbCredentials');

var
  UserModel = require('./models/user'),
  FeedBackModel = require('./models/feedback');

module.exports = {
  url: `mongodb://${credentials.username}:${credentials.password}@ds013260.mlab.com:13260/baraholka`,
  User: UserModel,
  FeedBack: FeedBackModel
}
