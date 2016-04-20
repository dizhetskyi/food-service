var app = angular.module('foodService');

app.controller('TestController', ['$scope', TestController]);

function TestController($scope) {

  var vm = this;

  vm.testVar = 'ololo';

}