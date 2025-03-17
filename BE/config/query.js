const getListOfProduct = "SELECT * FROM products";
const LOGIN_QUERY = "SELECT * FROM users WHERE username = ?  OR password = ?";
const REGISTER_QUERY = `INSERT INTO users (username, email, password, first_name, last_name, phone_number, country, place, address, postal_code, date_of_birth, profile_picture, wallet_balance, is_active, role) 
                        VALUES (? , ?, ? , ? , ?, ?, ?, ? , ? , ?, ?, ?, ?,?, ?);`;
const deleteUserAccount = `DELETE FROM users WHERE id = ?`;
const addProduct = `INSERT INTO products(product_id,product_name,category,discounted_price,actual_price,discount_percentage,rating,rating_count,about_product,user_id,user_name,review_id,review_title,review_content,img_link,product_link) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
const getCartListData = "SELECT * FROM cart;";
const addCartDataInToDb = `INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?);`;
const productById = `SELECT * FROM products where product_id = ?;`;
const deleteProduct = `DELETE FROM products WHERE product_id = ? ;`;
const getuserProfile = `SELECT * FROM users WHERE id = ?;`;
const getUserList = "SELECT * FROM users;";
const addNewUser = `INSERT INTO users (
    username, email, password, first_name, last_name, phone_number, 
    country, place, address, postal_code, date_of_birth, profile_picture, 
    wallet_balance, is_active, role
)  
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
// Categories
const getAllCategory = "Select * FROM categories;";
const addNewCategory = `INSERT INTO categories (main_category_name, name, slug, description, tags, image) VALUES (?, ?, ?, ?, ?, ?);`;
const deleteCategory = "DELETE FROM categories WHERE id = ?;";
const updateQuery = `UPDATE categories 
SET 
    main_category_name = ?,
    name = ?,
    slug = ?,
    description = ?,
    tags = ?,
    image = ?,
    is_active = ?,
    updated_at = CURRENT_TIMESTAMP
WHERE 
    id = ?;
`;

module.exports = {
  addNewUser,
  getListOfProduct,
  LOGIN_QUERY,
  REGISTER_QUERY,
  addProduct,
  productById,
  deleteUserAccount,
  deleteProduct,
  getuserProfile,
  getUserList,
  getAllCategory,
  addNewCategory,
  deleteCategory,
  updateQuery,
};
