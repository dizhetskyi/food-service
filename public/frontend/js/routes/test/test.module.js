var testModule = angular.module('test', []);

testModule.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/test', {
      controller: 'TestController',
      template: 'test template <b>ololo</b>'
    })

}])