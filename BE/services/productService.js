let connection = require("../config/dbConnection");
let query = require("../config/query");

const getAllProductList = async () => {
  return new Promise((resolve, reject) => {
    connection.query(query.getListOfProduct, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const addToCart = (data) => {
  return new Promise((resolve, reject) => {
    console.log(data);
  });
};

const addToWishlist = () => {
  return new Promise((resolve, reject) => {});
};

// Add a new product (Admin)
const addProduct = (data) => {
  let {
    product_id,
    product_name,
    category,
    discounted_price,
    actual_price,
    discount_percentage,
    rating,
    rating_count,
    about_product,
    user_id,
    user_name,
    review_id,
    review_title,
    review_content,
    img_link,
    product_link,
  } = data;
  return new Promise((resolve, reject) => {
    connection.query(
      query.addProduct,
      [
        product_id,
        product_name,
        category,
        discounted_price,
        actual_price,
        discount_percentage,
        rating,
        rating_count,
        about_product,
        user_id,
        user_name,
        review_id,
        review_title,
        review_content,
        img_link,
        product_link,
      ],
      (err, results) => {
        if (err) {
          reject({
            success: false,
            message: `Product is not added : ${err}`,
          });
        } else {
          const response = {
            success: true,
            message: "New Product is added successful!",
            item: results.affectedRows,
          };
          resolve(response);
        }
      }
    );
  });
};
// Update product details (Admin)
const updateProduct = (id, updatedData) => {
  return new Promise((resolve, reject) => {
    if (!id) {
      return reject({
        success: false,
        message: "Product ID is required for updating the product.",
      });
    }

    if (!updatedData || Object.keys(updatedData).length === 0) {
      return reject({
        success: false,
        message: "No update data provided.",
      });
    }

    let query = `UPDATE products SET ? WHERE product_id = ?`;

    connection.query(query, [updatedData, id], (err, result) => {
      if (err) {
        return reject({
          success: false,
          message: `Error updating product with ID ${id}: ${err.message}`,
        });
      }

      if (result.affectedRows === 1) {
        return resolve({
          success: true,
          message: "Product updated successfully!",
          affectedRows: result.affectedRows,
        });
      } else {
        return reject({
          success: false,
          message: `No product found with ID = '${id}'`,
        });
      }
    });
  });
};

const deleteProduct = (id) => {
  // make sure this is done by admin only
  return new Promise((resolve, reject) => {
    console.log(id, "product");
    connection.query(query.deleteProduct, id, (err, result) => {
      console.log(result);
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(query.productById, id, (err, results) => {
      if (err) {
        reject({
          success: false,
          message: `Product is not in the list : ${err}`,
        });
      } else {
        if (results.length > 0) {
          const response = {
            success: true,
            message: "Successful!",
            product: results,
          };

          resolve(response);
        } else {
          reject({
            success: false,
            message: `Product is not in the list`,
          });
        }
      }
    });
  });
};

const getProductReviews = async (id) => {
  if (!id) {
    throw {
      success: false,
      message: "Product ID Needed for product reviews."
    };
  }
  const query = "SELECT review_content, review_id, review_title FROM products WHERE product_id = ?";
  const results = await new Promise((resolve, reject) => {
    connection.query(query, id, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
  if (results.length === 0) {
    throw {
      success: false,
      message: "Product with the given id does not exist."
    };
  }
  const { review_content, review_id, review_title } = results[0];
  if (!review_content?.trim() || !review_id?.trim() || !review_title?.trim()) {
    return {
      success: true,
      message: "Product do not have any reviews till now."
    };
  }
  return {
    review_title: review_title.split(","),
    review_id: review_id.split(","),
    review_content: review_content.split(",")
  };
};

const addProductReview = (id, data) => {};
module.exports = {
  getAllProductList,
  addToCart,
  addToWishlist,
  updateProduct,
  deleteProduct,
  addProduct,
  getProductReviews,
  getProductById,
  addProductReview,
};
