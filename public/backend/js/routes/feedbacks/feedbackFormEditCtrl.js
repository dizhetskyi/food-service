/**
 * Created by Artya on 24.04.2016.
 */
var app = angular.module('foodService');

app.controller('FeedEditController', ['$routeParams', '$http', '$location', feedbackFormEditCtrl]);

function feedbackFormEditCtrl($routeParams, $http, $location){
    var vm  = this;
    vm.formData = {};

    $http.get('/api/feedback/'+ $routeParams.id)
        .then(function(res){
            vm.formData = res.data.feed;
            vm.statuses = res.data.statuses;
            vm.types = res.data.types;
    });

    vm.submitFeedEditForm = function (){
        $http.put('/api/feedback/' + $routeParams.id, _serializeForm());
        $location.url('/feedback');
    };

    function _serializeForm(){
        return {
            customer: {
                name: vm.formData.customer.name,
                phone: vm.formData.customer.phone,
                email: vm.formData.customer.email
            },
            status: vm.formData.statuses,
            type: vm.formData.feedbackType,
            content: vm.formData.content
        }
    }

}


