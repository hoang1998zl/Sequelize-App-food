const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const { createToken } = require('../ultil/token')
const { successCode, errorCode, failCode } = require("../config/response");
const prisma = new PrismaClient();


const newOrder = async (req, res) => {

  try {
    const user = req.user.content;
    const { user_id } = user;
    const { food_id, amount, code, arr_sub_id } = req.body;

    const data = await prisma.orderTable.create({
      data: {
        user_id,
        food_id,
        amount,
        code,
        arr_sub_id,
      },
    });
    console.log(user_id);
    return successCode(
      res,
      data,
      "Tạo thành công!"
    );
  } catch (error) {
    return errorCode(res, error.message);
  }
};

module.exports = {
  newOrder,
}