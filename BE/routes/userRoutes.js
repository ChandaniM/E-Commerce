const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
router.post("/register", userController.signup);
router.get("/login", userController.login);
router.put("/update/:id", userController.updateUserdetailsController);
router.delete("/delete/:id", userController.deleteUserAccountController);
router.get("/auth/profile", userController.getProfile);
router.put("/auth/profile/update/:id", userController.updateUserProfile);
router.get("/user-list", userController.getUserListController);
router.post("/addUser", userController.addNewUserController);
router.patch('/update/:id', userController.updateUser);

// router.post("/auth/forgot-password", userController.forgetUserPassword);
// router.post("/auth/reset-password" ,  userController.resetUsersPassword);

module.exports = router;

/**
 * 
POST	/api/auth/register	        Register a new user
POST	/api/auth/login	            Login user & get token
POST	/api/auth/logout	        Logout user
POST	/api/auth/refresh-token	    Refresh JWT token
GET	    /api/auth/profile	        Get user profile
PUT	    /api/auth/profile/update	Update user profile
POST	/api/auth/forgot-password	Request password reset
POST	/api/auth/reset-password	Reset password using token
POST	/api/auth/change-password	Change password (logged-in users)
 * */
