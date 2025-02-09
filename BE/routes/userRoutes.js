const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
router.post("/singup", userController.signup);
router.get("/login", userController.login);
router.put("/update/:id", userController.updateUserdetailsController);
router.delete("/delete/:id", userController.deleteUserAccountController);
module.exports = router;

/**
 * 
POST	/api/auth/register	        Register a new user
POST	/api/auth/login	            Login user & get token
GET	    /api/auth/profile	        Get user profile
PUT	    /api/auth/profile/update    Update user profile
POST	/api/auth/logout	        Logout user
 * */
