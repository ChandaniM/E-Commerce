const express = require('express');
const router = express.Router();
const productController = require("../controllers/productController");
router.get('/products', productController.getAllProduct);
router.get('/addToCart',productController.addToCartController)
router.get('/addProduct' , productController.addProductController)
router.get('/wishlist',productController.addToWishlistController)


module.exports = router;