var db = require('../db/config');

function getAllFeedbacks(req, res) {
  db.Feedback.find({}, function(err, feedbacks){
    res.json({
      success: true,
      feedbacks: feedbacks,
      types: db.Feedback.schema.path('feedbackType').enumValues,
      statuses: db.Feedback.schema.path('status').enumValues
    })
  })
}

function getOneFeedback(req, res) {

  var feedbackId = req.params.feedbackId;

  db.Feedback.findById(feedbackId, function (err, feedback) {
    res.json({
      success: true,
      feedbackData: feedback
    });
  })
}

function getFeedbackTypes(req, res) {
  res.json({
    success: true,
    types: db.Feedback.schema.path('feedbackType').enumValues
  })
}
function getFeedbackStatuses(req, res) {
  res.json({
    success: true,
    statuses: db.Feedback.schema.path('status').enumValues
  })
}

function createFeedback(req, res) {

  db.Feedback.create(req.body, function(err, feedback){
    if (err) {
      res.json({
        success: false,
        errors: err
      });
      return;
    }
    res.json({
      success: true
    })
  })

}

function updateFeedback(req, res) {

  var feedbackId = req.params.feedbackId;

  db.Feedback.findByIdAndUpdate(feedbackId, req.body, {new: true}, function(err, updated) {
    res.json({
      success: true
    })
  })
}

function deleteFeedback(req, res) {

  var feedbackId = req.params.feedbackId;

  db.Feedback.findByIdAndRemove(feedbackId,  function(err, doc) {

    if (err) {
      res.sendStatus(500);
      return;
    }

    res.json({
      success: true
    })
  })
}

module.exports = {
  getAllFeedbacks: getAllFeedbacks,
  getOneFeedback: getOneFeedback,
  getFeedbackTypes: getFeedbackTypes,
  getFeedbackStatuses: getFeedbackStatuses,
  createFeedback: createFeedback,
  updateFeedback: updateFeedback,
  deleteFeedback: deleteFeedback
};