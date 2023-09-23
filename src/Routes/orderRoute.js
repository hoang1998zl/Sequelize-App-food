const express = require("express");
const {
  newOrder
} = require("../Controller/orderController");

const { verifyToken } = require('../ultil/token')
const orderRoute = express.Router();

orderRoute.post('/newOrder', verifyToken, newOrder);

module.exports = orderRoute;