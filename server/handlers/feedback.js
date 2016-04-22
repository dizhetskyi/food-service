var db = require('../db/config');

function getAll(req, res) {

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
}

function create(req, res) {

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

function getOne(req, res) {

  var id = req.params.id;

  db.Feedback.findById(id, function(err, doc) {

    if (err){
      res.json({
        success: false,
        errors: err
      });
      return;
    }

    res.json({
      success: true,
      feedbackData: doc
    });
  })  

}

function update(req, res) {

  var id = req.params.id;

  db.Feedback.findByIdAndUpdate(id, req.body, {new: true}, function(err, updated) {

    res.json({
      success: true
    })

  })

}


module.exports = {
  getAllFeedbacks: getAll,
  createFeedback: create,
  getOneFeedback: getOne,
  updateFeedback: update
}