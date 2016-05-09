var module = angular.module('test');

module.controller('TestController', TestController)

function TestController($scope) {
  console.log('sad');
}

TestController.$inject = ['$scope'];