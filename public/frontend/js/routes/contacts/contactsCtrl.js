var app = angular.module('foodService');

app.controller('ContactsController', ['$http', '$timeout', ContactsController]);

function ContactsController($http, $timeout) {

    var vm = this;

    vm.formData = {};

    $http.get('/api/feedback/types').then(function (res) {
        vm.feedbackTypes = res.data.types;
        vm.formData.feedbackType = vm.feedbackTypes[0];
    });

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

    vm.submitForm = function () {
        if (vm.feedbackForm.$valid){
            $http.post('/api/feedback', _serializeForm()).then(function (res) {
                vm.feedbackForm.$setPristine();
                vm.formData = {};
                vm.feedbackSent = true;
                $timeout(function() {
                    vm.feedbackSent = false;
                }, 3000);
            });
        }
    }

}