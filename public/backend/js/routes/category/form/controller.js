var app = angular.module('foodService');

app.controller('CategoryFormController', CategoryFormController);

CategoryFormController.$inject = ['$http', '$routeParams', '$route', '$location'];

function CategoryFormController($http, $routeParams, $route, $location) {

  var vm = this;

  vm.createMode = $route.current.$$route.create || false;

  vm.modelId = $routeParams.id;
  vm.formData = {};

  if (!vm.createMode){
    loadModel();
  }

  function loadModel() {
    vm.loading = true;
    $http.get('/api/category/' + vm.modelId)
    .then(function(res) {
      vm.formData = res.data.category;
      vm.loading = false;
    })
    .catch(function(err) {
      console.log(err);
      vm.loading = false;
    })
  }

  vm.handleSubmit = function() {

    $('.form-submit').button('loading');

    if (vm.createMode){

      $http.post('/api/category', _serializeForm())
      .then(function(res) {
        console.log('was created');
        $location.path('/category');
      })
      .catch(function(err) {
        console.log(err);
      })

    } else {

      $http.put('/api/category/' + vm.modelId, _serializeForm())
      .then(function(res) {
        console.log('was updated');

        $('.form-submit').button('reset');
      })
      .catch(function(err) {
        console.log(err);        
      })
      
    }
  }

  function _serializeForm() {
    return {
      name: vm.formData.name,
      description: vm.formData.description
    }
  }

}