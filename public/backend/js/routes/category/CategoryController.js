var app = angular.module('foodService');

app.controller('CategoryController', CategoryController);

CategoryController.$inject = ['$scope', '$http'];

function CategoryController($scope, $http) {

  var vm = this;

  vm.categories = [];
  loadCategories();

  vm.tree = {
    dropped: function(a) {
      updateStructure(1000)();
    }
  }

  var updateStructure = function(timeout){
    return _.debounce(function(){
      vm.isSorting = true
      $http.post('/api/category/structure', {
        structure: hierarchy(vm.categories)
      })
        .then(function() {
          vm.isSorting = false;
        })
    }, timeout)
  }

  function hierarchy(items){
    return items.length ? items.map(function(item) {
      return {
        id: item._id,
        children: hierarchy(item.children)
      }
    }) : [];
  };

  vm.handleDelete = function(id, e) {

    if (!confirm("Delete?")) return;

    angular.element(e.currentTarget).button('loading');
    vm.isSorting = true;

    $http.delete('/api/category/' + id)
    .then(function(res) {
      if (res.data.success){
        if (res.data.categories){
          vm.categories = res.data.categories;
        } else {
          vm.categories = deleteCategory(vm.categories, id);
        }
      } else {
        console.log(res.data.errors);
      }
      
      vm.isSorting = false;
    })
    .catch(function(err) {
      console.log(err);      
    })   

  }

  function deleteCategory(items, id){
    return items.filter(function(c) {
      if (c.children){
        c.children = deleteCategory(c.children, id);
      }
      return c._id !== id;
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