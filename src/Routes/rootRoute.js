const express = require("express");
const userRoute = require("./userRoute");
const likeRoute = require("./likeRoute");
const rateRoute = require("./rateRoute");
const orderRoute = require("./orderRoute");

const rootRoute = express.Router();

rootRoute.use("/user", userRoute);
rootRoute.use('/like', likeRoute);
rootRoute.use('/rate', rateRoute);
rootRoute.use('/order', orderRoute);

module.exports = rootRoute;