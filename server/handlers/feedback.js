var db = require('../db/config');

function getAllFeedbacks(req, res) {
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
      statuses: db.Feedback.schema.path('status').enumValues
    })
  })
}

function getOneFeedback(req, res) {
  db.Feedback.findById(req.params.id, function(err, feedback) {
    if (err){
      res.json({
        success: false,
        errors: err
      })
      return;
    }

    res.json({
      feedback: feedback,
      types: db.Feedback.schema.path('feedbackType').enumValues,
      statuses: db.Feedback.schema.path('status').enumValues
    })
  })
}

function createFeedback(req, res) {
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
}

function deleteFeedback(req, res) {
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
}

function editFeedback(req, res) {
    var id = req.params.id;
    db.Feedback.findByIdAndUpdate(id, req.body, {new: true}, function(err, updated) {
    if(err){
      res.json({
        success: false,
        errors: err
      })
    }

    res.json({
      success: true
    })
  })
}

module.exports = {
  getAllFeedbacks: getAllFeedbacks,
  createFeedback: createFeedback,
  deleteFeedback: deleteFeedback,
  editFeedback: editFeedback,
  getOneFeedback: getOneFeedback
}
