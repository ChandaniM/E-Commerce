let connection = require("../config/dbConnection");
let query = require("../config/query");

const getAllProductList = async () => {
  //  callback method
  return new Promise((resolve, reject) => {
    connection.query(query.getListOfProduct, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
  // .then method
  // async await
};

const addToCart = (data) => {
  return new Promise((resolve, reject) => {
    console.log(data);
    [user_id, product_id, quantity] = data;
    connection.query(
      query.addCartDataInToDb,
      [user_id, product_id, quantity],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
};

const addToWishlist = () => {
  return new Promise((resolve, reject) => {});
};
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

const getCartList = () => {
  return new Promise((resolve, reject) => {
    connection.query(query.getCartListData, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
const updateProduct = () => {
  return new Promise((resolve, reject) => {});
};

const deleteProduct = () => {
  return new Promise((resolve, reject) => {});
};

module.exports = {
  getAllProductList,
  addToCart,
  getCartList,
  addToWishlist,
  updateProduct,
  deleteProduct,
  addProduct,
};
