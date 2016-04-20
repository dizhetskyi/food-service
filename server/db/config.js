var credentials = require('./dbCredentials');

var UserModel = require('./models/user');
module.exports = {
  url: `mongodb://${credentials.username}:${credentials.password}@ds013260.mlab.com:13260/baraholka`,
  User: UserModel
}