var db = require('../db/config');

module.exports = {

  createFeedback: function (req, res) {
    console.log(req.body);
    db.Feedback.create(req.body, function (err, fb) {
      res.sendStatus(200);
    });
  },

  getAllFeedbacks: function (req, res) {
    db.Feedback.find({}, function (err, docs) {
      res.json(docs);
    })
  }
}
