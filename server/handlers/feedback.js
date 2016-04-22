var db = require('../db/config');

module.exports = {

  getAllFeedbacks: function(req, res) {

    db.Feedback.find({}, function(err, feedbacks){

      if (err) {
        res.json({
          success: false,
          errors: err
        })
        return;
      }

      res.json({
        success: true,
        feedbacks: feedbacks,
        types: db.Feedback.schema.path('feedbackType').enumValues,
        statuses: db.Feedback.schema.path('status').enumValues,
      })
    })

  },

  createFeedback: function(req, res) {

    db.Feedback.create(req.body, function(err, feedback){

      if (err) {
        res.json({
          success: false,
          errors: err
        })
        return;
      }

      res.json({
        success: true
      })
    })

  },

  deleteFeedback: function (req, res) {

    db.Feedback.findByIdAndRemove(req.params.id, function (err, feedback) {
      if(err) {
        res.json({
          success: false,
          errors: err
        })
        return;
      }

      res.json({
        success: true
      })
    })

  },

  editFeedback: function (req, res) {

    db.Feedback.findOneAndUpdate(req.params.id,)
  }

}
