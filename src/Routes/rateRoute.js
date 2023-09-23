const express = require("express");
const {
  getAllRates,
  getRateByUserId,
  getRateByResId,
  createRateRes
} = require("../Controller/rateController");

const rateRoute = express.Router();

rateRoute.get('/getAllRates', getAllRates);
rateRoute.get('/getRateByUserId/:user_id', getRateByUserId);
rateRoute.get('/getRateByResId/:res_id', getRateByResId);
rateRoute.get('/createRateRes', createRateRes);

module.exports = rateRoute;