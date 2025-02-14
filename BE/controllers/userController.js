const userService = require("../services/userService");
// new account should be open
const signup = async (req, res) => {
  try {
    let data = req.body;
    const response = await userService.signupUser(data);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred during signup.",
      error: error.message,
    });
  }
};
// login krlu
const login = async (req, res) => {
  try {
    let username = req.body.username;
    let password = req.body.password;
    console.log(username, password);
    let response = await userService.loginUser(username, password);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred during login.",
      error: error.message,
    });
  }
};
// this should be done by normal user or admin
const deleteUserAccountController = async (req, res) => {
  try {
    let data = req.params["id"];
    console.log(req.params["id"]);
    let response = await userService.deleteUserAccount(data);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUserdetailsController = async (req, res) => {
  try {
    let data = req.params["id"];
    console.log(req.params["id"]);
    let response = await userService.deleteUserAccount(data);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    let id = req.body["id"];
    console.log("User ID:", id);

    let userResponse = await userService.getProfile(id);

    res.status(200).send(userResponse);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send(error.message || "Internal Server Error");
  }
};

const updateUserProfile = async (req, res) => {
  try {
    let data = req.body;
    let id = req.params["id"];
    console.log(data, "USER DATA : ");
    let userResponse = await userService.updateUserProfile(id, data);
    res.status(200).send(userResponse);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send(error.message || "Internal Server Error");
  }
};

module.exports = {
  signup,
  login,
  deleteUserAccountController,
  updateUserdetailsController,
  getProfile,
  updateUserProfile,
};
