var app = angular.module('foodService')

app.controller('EditFeedbackCtrl', ['$scope', '$http', '$routeParams', editFeedbackCtrl])

function editFeedbackCtrl($scope, $http, $routeParams) {
  var vm = this;

  $http.get('/api/feedback/' + $routeParams.id)
    .then(function (res) {
      vm.formData = res.data.feedback;
      vm.statuses = res.data.statuses;
      vm.types = res.data.types;
    })

  vm.handleSubmitClick = function() {
    console.log(123123);
    $http.put('/api/feedback/' + $routeParams.id, _serializeForm())

  }

  function _serializeForm() {
    return {
      customer: {
        name: vm.formData.customer.name,
        phone: vm.formData.customer.phone,
        email: vm.formData.customer.email
      },
      status: vm.formData.status,
      feedbackType: vm.formData.feedbackType,
      content: vm.formData.content
    }
  }
}
