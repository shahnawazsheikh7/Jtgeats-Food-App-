const express = require("express");
const router = express.Router();

//import controllers
const {getCategories,newCategory,oneCategory,addProduct} = require("../controllers/categoriesController");

//routes
router.get('/categories',getCategories);
router.post('/newCategory',newCategory);
router.get('/category/:id',oneCategory);
router.post('/categories/addProduct',addProduct);

module.exports = router;