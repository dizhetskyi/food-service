var db = require('../db/config');

function getAllFeedBacks(req, res){

  db.FeedBack.find({}, function (err, feeds) {

    if(err){
      res.json({
        success:false,
        err: err
      });
      return;
    }

    res.json({
      success: true,
      statuses: db.FeedBack.schema.path('status').enumValues,
      types: db.FeedBack.schema.path('feedbackType').enumValues,
      feeds: feeds
    })
  })
}

function getTargetFeed(req, res){

  db.FeedBack.findById(req.params.id, function(err, feed){

    if(err){
      res.json({
        success: false,
        err: err
      });
      return;
    }

    res.json({
      //success: true,
      statuses: db.FeedBack.schema.path('status').enumValues,
      types: db.FeedBack.schema.path('feedbackType').enumValues,
      feed: feed
    })
  });
}

function deleteTargetFeed(req, res){

  db.FeedBack.findByIdAndRemove(req.params.id, function(err, feeds){

    if(err){
      res.sendStatus(500);
      return;
    }

    res.json({
      success: true
    });
  });
}

function editTargetFeed(req, res){

  var id = req.params.id;

  db.FeedBack.findByIdAndUpdate(id, req.body, {new: true}, function (err, updatedFeed) {
    if(err){
      res.json({
        success: false,
        err: err
      });
      return;
    }

    res.json({
      success: true,
      feed: updatedFeed
    });
  })
}

module.exports = {
  getAllFeedBacks: getAllFeedBacks,
  getTargetFeed: getTargetFeed,
  deleteTargetFeed: deleteTargetFeed,
  editTargetFeed: editTargetFeed
};
