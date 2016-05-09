var app = angular.module('foodService');

app.controller('CategoryItemController', CategoryItemController);

CategoryItemController.$inject = ['$http', '$routeParams'];

function CategoryItemController($http, $routeParams) {

  var vm = this;
  vm.modelId = $routeParams.id;

  loadModel();

  function loadModel() {
    vm.loading = true;
    $http.get('/api/category/' + vm.modelId)
    .then(function(res) {
      vm.category = res.data.category;
      vm.loading = false;
    })
    .catch(function(err) {
      console.log(err);
      vm.loading = false;
    })
  }

}