const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const { createToken } = require('../ultil/token')
const { successCode, errorCode, failCode } = require("../config/response");
const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    prisma.$disconnect();
    if (users.length > 0) {
      return successCode(
        res,
        users,
        "Lấy danh sách user thành công!"
      );
    } else {
      return failCode(res, "Không có dữ liệu!");
    }
  } catch (error) {
    prisma.$disconnect();
    return errorCode(res, error.message);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    prisma.$disconnect();

    if (!user) {
      return failCode(res, "Không có tài khoản!");
    }

    const passwordMatch = bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = createToken(user);
      return successCode(
        res,
        {
          user,
          token,
        },
        "Login thành công!"
      );
    } else {
      return failCode(res, "Sai password!");
    }
  } catch (error) {
    prisma.$disconnect();
    return errorCode(res, error.message);
  }
};

const createUser = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;

    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (existingUser) {
      return failCode(res, "Đã có tài khoản!");
    }

    const user = await prisma.user.create({
      data: {
        full_name,
        email,
        password,
      },
    });

    return successCode(
      res,
      user,
      "Tạo tài khoản thành công!"
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  getAllUsers,
  createUser,
  loginUser,
}