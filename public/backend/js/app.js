var app = angular.module('foodService', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/', {
      controller: 'IndexController as index',
      templateUrl: '/admin/js/routes/index/indexView.html'
    })
    .when('/feedbacks', {
      controller: 'FeedBackController as feeds',
      templateUrl: '/admin/js/routes/feedbacks/feedbacks_view.html'
    })
    .when('/test', {
      controller: 'TestController as test',
      templateUrl: '/admin/js/routes/test/testView.html'
    })
    .otherwise({
      redirectTo: '/'
    })

}])
