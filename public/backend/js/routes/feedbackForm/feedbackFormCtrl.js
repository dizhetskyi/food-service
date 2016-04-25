var app = angular.module('foodService');

app.controller('FeedbackFormController', ['$routeParams', '$http', FeedbackFormController]);

function FeedbackFormController($routeParams, $http){

  var vm = this;

  vm.modelId = $routeParams.id;
  vm.formData = {};

  $http.get('/api/feedback/' + vm.modelId)
    .then(function(req) {
      vm.formData = req.data.feedbackData;
      vm.types = req.data.types;
      vm.statuses = req.data.statuses;
    })

  vm.formSubmit = function() {
    $http.put('/api/feedback/' + vm.modelId, {
      content: vm.formData.content
    });
  }

}