var app = angular.module('foodService');

app.controller('FeedBacksController', ['$scope', '$http', '$routeParams', '$location', FeedBacksController]);

  function FeedBacksController($scope, $http, $routeParams, $location) {
    var vm = this;
    vm.feedbacks = [];

    $http.get('/api/feedback')
      .then(function (res) {
        if(res.data.success) {
          vm.feedbacks = res.data.feeds;
        }
    });

    vm.deleteFeed = function(id){
      $http.delete('/api/feedback/' + id)

          .then(function(res){
            console.log(res.data);
            if(res.data.success) {
              vm.feedbacks = vm.feedbacks.filter(function(el){
                return el._id !== id;
              })
            }
          })
    }
  }
