var app = angular.module('foodService');

app.controller('FeedBacksController', ['$scope', '$http', FeedBacksController]);

  function FeedBacksController($scope, $http) {
    var vm = this;
    vm.feedbacks = [];

    $http.get('/api/feedback')
      .then(function (res) {
        if(res.data.success) {
          vm.feedbacks = res.data.feeds;
        }
      });
  }
