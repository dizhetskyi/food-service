var app = angular.module('foodService');

app.controller('IndexController', ['$scope', '$http', IndexController])

function IndexController($scope, $http) {

  var vm = this;
  
  vm.users = [];

  $http.get('/api/users')
    .then(function(res) {
      if (res.data.success){
        vm.users = res.data.users
      }
    })

}