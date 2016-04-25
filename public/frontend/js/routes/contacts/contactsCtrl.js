var app = angular.module('foodService');

app.controller('ContactsController', ['$scope', '$http', ContactsController])

function ContactsController($scope, $http) {

  var vm = this;

  var $submitButton = angular.element(document.getElementById('formSubmitButton'));

  vm.init = function() {
    vm.formData = {};
    vm.feedbackTypes = [];

    vm.loadFeedbackTypes();
  };

  vm.loadFeedbackTypes = function() {
    vm.loading = true;
    $http.get('/api/feedback/types')
      .then(function(res) {
        vm.feedbackTypes = res.data.types;
        vm.formData.feedbackType = vm.feedbackTypes[0];
        vm.loading = false;
      })
  }

  vm.submitForm = function() {

    if (vm.feedbackForm.$valid){

      $submitButton.button('loading');

      $http.post('/api/feedback', _serializeForm())
        .then(function(res) {
          if (res.data.success){

            vm.feedbackForm.$setPristine();
            vm.formData = {};

            vm.feedbackSent = true;

            $submitButton.button('reset');

          }
        })

    }
    

  }

  function _serializeForm() {
    return {
      customer: {
        name: vm.formData.customer.name,
        phone: vm.formData.customer.phone,
        email: vm.formData.customer.email
      },
      content: vm.formData.content,
      feedbackType: vm.formData.feedbackType
    }
  }

  vm.init();
  
}