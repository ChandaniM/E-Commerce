const { response } = require("express");
let connection = require("../config/dbConnection");
let query = require("../config/query");

const getAllProductList = async () => {
  return new Promise((resolve, reject) => {
    connection.query(query.getListOfProduct, async (err, results) => {
      if (err) {
        return reject(err);
      }

      for (let product of results) {
        try {
          let categoryResult = await executeQuery(
            `SELECT name AS category_name, main_category_name 
             FROM categories WHERE id = ?`,
            [product.category_id]
          );

          if (categoryResult.length) {
            product.category_name = categoryResult[0].category_name;
            product.main_category_name = categoryResult[0].main_category_name;
          } else {
            product.category_name = "Unknown Category";
            product.main_category_name = "Unknown Main Category";
          }
        } catch (error) {
          console.error("Error fetching category data:", error);
        }
      }

      resolve(results);
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
    name,
    short_title,
    category_id,
    brand,
    sku,
    discount_price,
    actual_price,
    stock_quantity,
    description,
    detail_description,
    weight,
    user_id,
    on_sale,
    img_link,
    product_link,
  } = data;
  return new Promise((resolve, reject) => {
    connection.query(
      query.addProduct,
      [
        name,
        short_title,
        category_id,
        brand,
        sku,
        discount_price,
        actual_price,
        stock_quantity,
        description,
        detail_description,
        weight,
        user_id,
        on_sale,
        img_link,
        product_link,
      ],
      (err, results) => {
        if (err) {
          reject({
            type: "error",
            message: `Product is not added : ${err}`,
            response: err,
          });
        } else {
          const response = {
            type: "success",
            message: "A product is added successfully!",
            response: results,
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
            response: results,
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
      message: "Product ID Needed for product reviews.",
    };
  }
  const query =
    "SELECT review_content, review_id, review_title FROM products WHERE product_id = ?";
  const results = await new Promise((resolve, reject) => {
    connection.query(query, id, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
  if (results.length === 0) {
    throw {
      success: false,
      message: "Product with the given id does not exist.",
    };
  }
  const { review_content, review_id, review_title } = results[0];
  if (!review_content?.trim() || !review_id?.trim() || !review_title?.trim()) {
    return {
      success: true,
      message: "Product do not have any reviews till now.",
    };
  }
  return {
    review_title: review_title.split(","),
    review_id: review_id.split(","),
    review_content: review_content.split(","),
  };
};

const getAllCategoryService = () => {
  return new Promise((resolve, reject) => {
    connection.query(query.getAllCategory, (err, results) => {
      if (err) {
        reject({
          type: "fail",
          response: results,
          error: err,
        });
      } else {
        resolve({
          type: "success",
          response: results,
          error: null,
        });
      }
    });
  });
};
const addProductReview = (id, data) => {};

// const addCategoryServices = (data) => {
//   return new Promise((resolve, reject) => {
//     const {
//       main_category_name,
//       name,
//       slug,
//       description,
//       tags,
//       is_active,
//       image,
//     } = data;

//     const isActive = is_active ? 1 : 0;

//     console.log(
//       main_category_name,
//       name,
//       slug,
//       description,
//       tags,
//       isActive,
//       image
//     );

//     connection.query(
//       query.addNewCategory,
//       [main_category_name, name, slug, description, tags, isActive, image],
//       (err, results) => {
//         if (err) {
//           return reject({
//             type: "fail",
//             message: "Failed to add category. Please try again later.",
//             response: err,
//           });
//         }
//         resolve({
//           type: "success",
//           message: "Category added successfully!",
//           response: results,
//           error: null,
//         });
//       }
//     );
//   });
// };

const addCategoryServices = async (data) => {
  try {
    const {
      main_category_name,
      name,
      slug,
      description,
      tags,
      is_active,
      image,
    } = data;

    // Convert boolean/string to integer (1 or 0)
    const isActive = is_active ? 1 : 0;

    const results = await executeQuery(query.addNewCategory, [
      main_category_name,
      name,
      slug,
      description,
      tags,
      isActive,
      image,
    ]);

    return {
      type: "success",
      message: "Category added successfully!",
      response: results,
    };
  } catch (err) {
    let errorMessage = "Failed to add category. Please try again later.";

    // Handle specific SQL errors
    if (err.code === "ER_DUP_ENTRY") {
      errorMessage = "Category already exists. Please use a different name.";
    } else if (err.code === "ER_BAD_NULL_ERROR") {
      errorMessage = "Required category fields are missing.";
    }

    return {
      type: "fail",
      message: errorMessage,
      error: err,
    };
  }
};

const deleteCategoryServices = async (id) => {
  try {
    const results = await executeQuery(query.deleteCategory, id);
    return {
      type: results.affectedRows == 1 ? "success" : "fail",
      message:
        results.affectedRows == 1
          ? "Category deleted successfully!"
          : `Category with ID ${id} does not exist or has already been deleted!`,
      response: results.affectedRows,
    };
  } catch (error) {
    return {
      type: "fail",
      message: errorMessage,
      error: error,
    };
  }
};

const executeQuery = async (sql, params) => {
  // backfilling
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
  // await connection.query(sql, params);
};

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
  getAllCategoryService,
  addCategoryServices,
  deleteCategoryServices,
};
