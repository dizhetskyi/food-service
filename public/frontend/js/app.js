var app = angular.module('foodService', ['ngRoute', 'ngMessages']);

app.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/', {
      controller: 'IndexController as indexCtrl',
      templateUrl: '/public/js/routes/index/indexView.html'
    })
    .when('/contacts', {
      controller: 'ContactsController as contactsCtrl',
      templateUrl: '/public/js/routes/contacts/contactsView.html'      
    })
    .otherwise({
      redirectTo: '/'
    })

}])