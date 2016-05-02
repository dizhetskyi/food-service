var app = angular.module('foodService');

app.controller('FeedbackController', ['$http', FeedbackController]);

function FeedbackController($http) {

    var vm = this;

    vm.feedbacks = [];

    var _types = {
        'QUESTION': 'warning',
        'COMPLAINT': 'danger',
        'PROPOSAL': 'info'
    };

    var _statuses = {
        'NEW': 'info',
        'PENDING': 'danger',
        'CLOSED': 'success'
    };

    vm.selectedType = '';
    vm.changeSelectedType = function (type) {
        vm.selectedType = type;
    };

    $http.get('/api/feedback/types')
        .then(function (res) {
            vm.feedbackTypes = res.data.types;
        });

    $http.get('/api/feedback/statuses')
        .then(function (res) {
            vm.feedbackStatuses = res.data.statuses;
            vm.selectedStatus = vm.feedbackStatuses[0];
        });

    $http.get('/api/feedback')
        .then(function (res) {
            vm.feedbacks = res.data.feedbacks;
        });

    vm.type = function (type) {
        return _types[type];
    };

    vm.status = function (type) {
        return _statuses[type];
    };
}