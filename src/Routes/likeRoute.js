const express = require("express");
const {
  getAllLikes,
  getLikeByUserId,
  getLikeByResId
} = require("../Controller/likeController");

const likeRoute = express.Router();

likeRoute.get('/getAllLikes', getAllLikes);
likeRoute.get('/getLikeByUserId/:user_id', getLikeByUserId);
likeRoute.get('/getLikeByResId/:res_id', getLikeByResId);

module.exports = likeRoute;