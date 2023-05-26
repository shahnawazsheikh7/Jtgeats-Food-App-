
const express = require("express");
const router = express.Router();

const {getAllProducts,getProduct} = require("../controllers/productController")

router.get("/products",getAllProducts);
router.get("/product/:id",getProduct);

module.exports = router;