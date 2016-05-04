var app = angular.module('foodService', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/', {
      controller: 'IndexController as index',
      templateUrl: '/admin/js/routes/index/indexView.html'
    })
    .when('/feedback/delete/:id', {
      controller: 'FeedBacksController as feedCtrl',
      templateUrl: '/admin/js/routes/feedbacks/feedbacks_view.html'
    })
    .when('/feedback/edit/:id', {
      controller: 'FeedEditController as feedEditCtrl',
      templateUrl: '/admin/js/routes/feedbacks/feedback_form_edit.html'
    })
    .when('/feedback', {
      controller: 'FeedBacksController as feedCtrl',
      templateUrl: '/admin/js/routes/feedbacks/feedbacks_view.html'
    })
    .when('/test', {
      controller: 'TestController as test',
      templateUrl: '/admin/js/routes/test/testView.html'
    })
    .otherwise({
      redirectTo: '/'
    })

}]);
