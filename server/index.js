const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const port = 3663;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const server = app.listen(port, function() {
  console.log('app is running at http://localhost:%s', port);
});


// aliases
app.use('/libs', express.static(path.resolve(__dirname + '/../node_modules')));
app.use('/admin', express.static(path.resolve(__dirname + '/../public/backend')));
app.use('/public', express.static(path.resolve(__dirname + '/../public/frontend')));


// database
const mongoose = require('mongoose');
const db = require('./db/config');

mongoose.connect(db.url);


// routes

var apiRouter = express.Router();

var usersAPI = require('./handlers/users');
var feedbackAPI = require('./handlers/feedback');


apiRouter.route('/users')
  .get(usersAPI.getAllUsers);

apiRouter.route('/feedback')
  .get(feedbackAPI.getAllFeedbacks)
  .post(feedbackAPI.createFeedback);

apiRouter.route('/feedback/types')
  .get(feedbackAPI.getFeedbackTypes);

apiRouter.route('/feedback/statuses')
  .get(feedbackAPI.getFeedbackStatuses);

apiRouter.route('/feedback/:feedbackId')
  .get(feedbackAPI.getOneFeedback)
  .delete(feedbackAPI.deleteFeedback)
  .put(feedbackAPI.updateFeedback);

app.use('/api', apiRouter);



// admin serve

app.get(['/admin', '/admin/*'], function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../public/backend/app.html'));
});

// frontend serve
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../public/frontend/app.html'));
});