var app = angular.module('foodService', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/', {
      controller: 'IndexController as index',
      templateUrl: '/admin/js/routes/index/indexView.html'
    })
    .when('/test', {
      controller: 'TestController as test',
      templateUrl: '/admin/js/routes/test/testView.html'
    })
    .when('/feedback', {
      controller: 'FeedbackController as feedbackCtrl',
      templateUrl: '/admin/js/routes/feedback/feedbackView.html'
    })
    .when('/feedback/:id', {
      controller: 'FeedbackItemController as feedbackItemCtrl',
      templateUrl: '/admin/js/routes/feedbackItem/feedbackItemView.html'
    })
    .otherwise({
      redirectTo: '/'
    })
}]);