const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const port = 3663;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const server = app.listen(port, function() {
  console.log('app is running at http://localhost:%s', port);
})


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

// user routes
var usersAPI = require('./handlers/users');

apiRouter.route('/users')
  .get(usersAPI.getAllUsers);

// feedback routes
var feedbackAPI = require('./handlers/feedback');

apiRouter.route('/feedback')
  .get(feedbackAPI.getAllFeedbacks)
  .post(feedbackAPI.createFeedback)

apiRouter.route('/feedback/types')
  .get(feedbackAPI.getFeedbackTypes)

apiRouter.route('/feedback/:id')
  .get(feedbackAPI.getOneFeedback)
  .put(feedbackAPI.updateFeedback)

// category routes
var categoryAPI = require('./handlers/category');

apiRouter.route('/category')
  .get(categoryAPI.getAllCategories)
  .post(categoryAPI.createCategory);

apiRouter.route('/category/:id')
  .get(categoryAPI.getCategory)
  .put(categoryAPI.updateCategory)
  .delete(categoryAPI.deleteCategory)

app.use('/api', apiRouter);


// admin serve
app.get(['/admin', '/admin/*'], function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../public/backend/app.html'));
})

// frontend serve
app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../public/frontend/app.html'));
})