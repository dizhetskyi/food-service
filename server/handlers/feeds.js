var db = require('../db/config');

module.exports = {
  getAllFeedBacks: function (req, res) {
    db.FeedBack.find({}, function (err, feeds) {
      if(err) throw new err;

      res.json({
        success: true,
        feeds: feeds
      })
    })
  }
}
