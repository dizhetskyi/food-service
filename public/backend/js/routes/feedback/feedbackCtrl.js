var app = angular.module('foodService');

app.controller('FeedbackController', ['$http', FeedbackController]);

function FeedbackController($http) {

  var vm = this;

  vm.items = [];

  $http.get('/api/feedback')
    .then(function(req) {
      vm.items = req.data.feedbacks;
    })

}