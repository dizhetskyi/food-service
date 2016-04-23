var app = angular.module('foodService');

app.controller('FeedbackController', ['$scope', '$http', FeedbackController])

function FeedbackController($scope, $http) {

  var vyooshka = this;

  vyooshka.feedbacks = [];

  $http.get('/api/feedback')
    .then(function (res) {
      if (res.data.success){
        vyooshka.feedbacks = res.data.feedbacks;
      }
    })

  vyooshka.handleDeleteClick = function(id){
    $http.delete('/api/feedback/' + id)
      .then(function (res) {
        if (res.data.success){
          vyooshka.feedbacks = vyooshka.feedbacks.filter(function (el) {
            return el._id !== id;
          });
        }
      })

  }

  vyooshka.handleEditClick = function(id){
    var feedbackToBeEdited;
    $http.put('/api/feedback/' + id)
    .then(function (res) {
      if (res.data.success){

      }
    })
  }
}
