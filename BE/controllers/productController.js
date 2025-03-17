let productService = require("../services/productService");
// get all this list only for customer
const getAllProducts = async (req, res) => {
  try {
    let response = await productService.getAllProductList();
    res.status(200).send(response);
  } catch {
    res.status(500).send(error);
  }
};
//  this should be done by only customer
const addToCart = async (req, res) => {
  try {
    let data = req.body;
    let response = await productService.addToCart(data);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

// this should be done by only vendor or admin
const addProduct = async (req, res) => {
  try {
    let data = req.body;
    // need to know which type of user is login first if its not an admin dont go forword
    let response = await productService.addProduct(data);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Add to wishlist item
const addToWishlist = async (req, res) => {
  try {
    let data = req.body;
    console.log(data, "this is for addToWishlistController");
    let response = await productService.addToWishlist(data);
    console.log(response, "this is wishlist resposne ");
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a specific product
const getProductById = async (req, res) => {
  try {
    const id = req.params["id"];
    console.log(id);
    const response = await productService.getProductById(id);
    console.log(response, "response from service getProductById");
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update product details (Admin)
const updateProduct = async (req, res) => {
  try {
    const id = req.params["id"];
    const data = req.body;
    const response = await productService.updateProduct(id, data);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete a product (Admin)
const deleteProduct = async (req, res) => {
  try {
    const deleteId = req.params["id"];
    const response = await productService.deleteProduct(deleteId);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get products by category
const getProductsByCategory = (req, res) => {
  // Logic to get products by category
};

// Add a product review
const addProductReview = async (req, res) => {
  const reviewId = req.params["productId"];
  const reviewData = req.body;
  console.log(reviewData, reviewId);

  const response = await productService.addProductReview(reviewId, reviewData);
  console.log(response, "this is for testing");
  res.status(200).send(response);
};

// Get product reviews
const getProductReviews = async (req, res) => {
  try {
    const productReviewId = req.params["productId"];
    let resposne = await productService.getProductReviews(productReviewId);
    res.status(200).send(resposne);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete a review (Admin/User)
const deleteReview = (req, res) => {
  // Logic to delete a review
};

const getAllCategory = async (req, res) => {
  try {
    let resposne = await productService.getAllCategoryService(productReviewId);
    res.status(200).send(resposne);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllProducts,
  addProduct,
  addToCart,
  addToWishlist,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  addProductReview,
  getProductReviews,
  deleteReview,
  getAllCategory,
};
