var app = angular.module('foodService');

app.controller('CategoryController', CategoryController);

CategoryController.$inject = ['$http'];

function CategoryController($http) {

  var vm = this;


  vm.categories = [];

  loadCategories();

  vm.handleDelete = function(id, e) {

    if (!confirm("Delete?")) return;

    angular.element(e.currentTarget).button('loading');

    $http.delete('/api/category/' + id)
    .then(function(res) {
      vm.categories = vm.categories.filter(function(c) {
        return c._id !== id;
      })
    })
    .catch(function(err) {
      console.log(err);
      
    })   

  }

  function loadCategories() {
    
    vm.loading = true;

    $http.get('/api/category')
    .then(function(res) {
      vm.categories = res.data.categories;
      vm.loading = false;
    })
    .catch(function(err) {
      console.log(err);
      vm.loading = false;
    })

  }

}