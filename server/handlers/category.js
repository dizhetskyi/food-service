var db = require('../db/config');

function getAllCategories(req, res) {

  db.Category.find({deleted: false}).exec()
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
    res.json({
      success: true,
      category: deletedCategory
    })
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
  deleteCategory: deleteCategory
}