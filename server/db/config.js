var credentials = require('./dbCredentials');

var
<<<<<<< HEAD
  UserModel = require('./models/user'),
  FeedBackModel = require('./models/feedback');
=======
    UserModel = require('./models/user'),
    FeedBackModel = require('./models/feedback');
>>>>>>> fc4ab0ce22d473a1b04f2a9a4c017e7ad2d64584

module.exports = {
  url: `mongodb://${credentials.username}:${credentials.password}@ds013260.mlab.com:13260/baraholka`,
  User: UserModel,
  FeedBack: FeedBackModel
}
