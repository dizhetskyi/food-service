var Promise = require("bluebird");

var db = require('../db/config');

function getAllCategories(req, res) {

  var selectObj = {};

  if (req.query.hasOwnProperty("flat")) {
    selectObj = {
      _id: 1,
      name: 1
    }
  }

  db.Category.find({deleted: false, parent: null})
  .populate({
    path: 'children',
    populate: { 
      path: 'children',
      populate: {
        path: 'children'
      }
    }
  })
  .select(selectObj)
  .sort('order')
  .exec()
  .then(function(categories){
    res.json({
      success:true,
      categories: categories
    })
  })
  .catch(function(err){
    res.json({
      success: false,
      errors: err
    })
  })

}

function create(req, res) {

  db.Category.create(req.body)
  .then(function(category) {
    setTimeout(function(){
      res.json({
        success: true,
        category: category
      })
    }, 1000)
  })
  .catch(function(err) {
    res.json({
      success: false,
      errors: err
    })
  })

}

function updateNodeStructure(items, parent, iterator){

  return items.reduce(function(arr, item, i) {

    var promise = db.Category.findByIdAndUpdate(item.id, {
      $set: {
        order: ++iterator,
        parent: parent,
        children: item.children.map(function(el) {
          return el.id
        })
      }
    }, {new: true})

    var promises = [];

    if (item.children.length){
      promises = updateNodeStructure(item.children, item.id, iterator);
    }

    return arr.concat(promise, promises);

  }, [])

}

function updateStructure(req, res) {

  var promises = updateNodeStructure(req.body.structure, null, 0)

  Promise.all(promises)
    .then(function(value) {
      res.json({
        success: true
      });
    })
    .catch(function(err) {
      res.json({
        success: false,
        errors: err
      })
    })
}

function getCategory(req, res) {

  db.Category.findById(req.params.id)
  .then(function(category) {    
    res.json({
      success: true,
      category: category
    })    
  })
  .catch(function(err) {
    res.json({
      success: false,
      errors: err
    })
  })

}

function updateCategory(req, res) {

  db.Category.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(function(updatedCategory) {
    res.json({
      success: true,
      category: updatedCategory
    })
  })
  .catch(function(err) {
    res.json({
      success: false,
      errors: err
    })
  })

}

function deleteCategory(req, res) {

  db.Category.findByIdAndRemove(req.params.id)
  .then(function(deletedCategory) {

    if (deletedCategory.children){

      var promises = [];

      db.Category.populate(deletedCategory, 'children').then(function(populated) {
        populated.children.forEach(function(el) {
          promises.push(el.update({
            parent: populated.paent,
            order: 0
          }).exec())
        })

        Promise.all(promises)
        .then(function() {

          return db.Category.find({deleted: false, parent: null})
            .populate({
              path: 'children',
              populate: { 
                path: 'children',
                populate: {
                  path: 'children'
                }
              }
            })
            .sort('order')
            .exec()
            .then(function(categories){

              res.json({
                success: true,
                category: deletedCategory,
                categories: categories
              })
            })

        })

      })

    } else {      
      
      res.json({
        success: true,
        category: deletedCategory
      })

    }

  })
  .catch(function(err) {
    res.json({
      success: false,
      errors: err
    })
  })

}

module.exports = {
  getAllCategories: getAllCategories,
  createCategory: create,
  getCategory: getCategory,
  updateCategory: updateCategory,
  deleteCategory: deleteCategory,
  updateStructure: updateStructure,
}