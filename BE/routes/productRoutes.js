/**
 ## **3. Product Management**
| Method | Route | Description |
|---------|-------------|----------------|
| **GET** | `/api/products` | Get all products |
| **GET** | `/api/products/:id` | Get a specific product |
| **POST** | `/api/addproducts` | Add a new product (Admin) |
| **PUT** | `/api/products/:id` | Update product details (Admin) |
| **DELETE** | `/api/products/:id` | Delete a product (Admin) |
| **GET** | `/api/products/category/:categoryId` | Get products by category |
| **POST** | `/api/products/review/:productId` | Add a product review |
| **GET** | `/api/products/reviews/:productId` | Get product reviews |
| **DELETE** | `/api/products/review/:reviewId` | Delete a review (Admin/User) |
* */

const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Get all products -- Done
router.get("/products", productController.getAllProducts);

// Get a specific product -- Done
router.get("/products/:id", productController.getProductById);

// Add a new product (Admin) -- Done
router.post("/addproducts", productController.addProduct);

// Update product details (Admin) -- Done
router.put("/products/:id", productController.updateProduct);

// Delete a product (Admin) -- Done
router.delete("/products/:id", productController.deleteProduct);

// Delete a review (Admin/User) -- Done
router.delete("/products/review/:reviewId", productController.deleteReview);

// Get products by category
router.get(
  "/products/category/:categoryId",
  productController.getProductsByCategory
);

// Add a product review
router.post("/products/review/:productId", productController.addProductReview);

// Get product reviews
router.get("/products/reviews/:productId", productController.getProductReviews);

router.get("/addToCart", productController.addToCart);

router.get("/wishlist", productController.addToWishlist);

module.exports = router;
