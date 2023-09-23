const express = require("express");
const {
  getAllUsers,
  createUser,
  loginUser,
} = require("../Controller/userController");

const userRoute = express.Router();

userRoute.get('/getAllUsers', getAllUsers);
userRoute.post('/createUser', createUser);
userRoute.post('/login', loginUser);

module.exports = userRoute;