/**
 * Created by Artya on 24.04.2016.
 */
var app = angular.module('foodService');

app.controller('FeedEditController', ['$scope', '$routeParams', '$http', feedbackFormEditCtrl]);

function feedbackFormEditCtrl($scope, $routeParams, $http){
    var vm  = this;
    vm.formData = {};


    $http.get('/api/feedback/'+ $routeParams.id)
        .then(function(res){
            vm.formData = res.data.feed;
            vm.statuses = res.data.statuses;
            vm.types = res.data.types;
        });

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


