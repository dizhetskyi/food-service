var app = angular.module('foodService');

    app.controller('FeedbackItemController', ['$http', '$routeParams', '$location', '$timeout', FeedbackItemController]);

function FeedbackItemController($http, $routeParams, $location, $timeout) {
    var vm = this;

    var feedbackId = $routeParams.id;

    $http.get('/api/feedback/statuses').then(function (res) {
        vm.feedbackStatuses = res.data.statuses;
    });

    $http.get('/api/feedback/' + feedbackId).then(function (res) {
        vm.feedback = res.data.feedbackData;
        vm.selectedStatus = vm.feedback.status;
    });

    vm.handleUpdatefeedback = function () {
        $http.put('/api/feedback/' + feedbackId, _serializeUpdateForm()).then(function () {
            vm.feedbackUpdate = true;
            $timeout(function() {
                vm.feedbackUpdate = false;
            }, 3000);
        });
    };

    function _serializeUpdateForm() {
        return {
            status: vm.selectedStatus
        }
    }

    vm.removeFeedback = function (id) {
        $http.delete('/api/feedback/'+id).then(function () {
            $location.path('/feedback')
        });
    }
}