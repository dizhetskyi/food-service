var db = require('../db/config');

module.exports = {

  getAllUsers: function(req, res) {

    db.User.find({}, function(err, users){
      res.json({
        success: true,
        users: users,
        types: db.User.feedbackTypes()
      })
    })

  }

}