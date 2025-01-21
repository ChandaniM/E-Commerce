const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
router.post('/singup', userController.signup);
router.get('/login' , userController.login);
router.put('/update/:id', userController.updateUserdetailsController);
router.delete('/delete/:id', userController.deleteUserAccountController);
module.exports = router;

