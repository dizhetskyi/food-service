angular.module('foodService')
  .controller('feedCtrl', ['$scope', '$http', 'feedCtrl']);

  function feedCtrl($scope, $http) {
    var vm = this;
    vm.feeds = [];

    $http.get('/api/feedbacks')
      .then(function (res) {
        if(res.data.success) {
          vm.feeds = res.data.feeds;
        }
      });
  }
