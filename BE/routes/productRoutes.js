const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
router.get("/products", productController.getAllProduct);
router.post("/addToCart", productController.addToCartController);
router.post("/addProduct", productController.addProductController);
router.post("/wishlist", productController.addToWishlistController);
router.get('/getCartData', productController.getCartListController);
module.exports = router;
