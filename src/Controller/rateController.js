const { PrismaClient } = require("@prisma/client");
const { successCode, errorCode, failCode } = require("../config/response");
const prisma = new PrismaClient();

const getAllRates = async (req, res) => {
  try {
    const rates = await prisma.rateRes.findMany();
    prisma.$disconnect();
    if (rates.length > 0) {
      return successCode(
        res,
        rates,
        "Lấy danh sách rate thành công!"
      );
    } else {
      return failCode(res, "Không có dữ liệu!");
    }
  } catch (error) {
    prisma.$disconnect();
    return errorCode(res, error.message);
  }
}

const createRateRes = async (req, res) => {
  const { user_id, res_id, amount, date_rate } = req.body;

  try {
    const currentDate = new Date();
    const date_rate = currentDate.toISOString();

    const data = await prisma.rateRes.create({
      data: {
        user_id,
        res_id,
        amount,
        date_rate,
      },
    });
    res.send(data);
    // if (data.length > 0) {
    //   return successCode(
    //     res,
    //     data,
    //     "Thêm Rate mới thành công!"
    //   );
    // } else {
    //   return failCode(res, "Không có dữ liệu!");
    // }
  } catch (error) {
    prisma.$disconnect();
    return errorCode(res, error.message);
  }
};

const getRateByUserId = async (req, res) => {
  const { user_id } = req.params;

  try {
    const data = await prisma.rateRes.findMany({
      where: {
        user_id: parseInt(user_id),
      },
    });

    if (data.length > 0) {
      return successCode(
        res,
        data,
        "Lấy danh sách rate thành công!"
      );
    } else {
      return failCode(res, "Không có dữ liệu!");
    }
  } catch (error) {
    prisma.$disconnect();
    return errorCode(res, error.message);
  }
}

const getRateByResId = async (req, res) => {
  const { res_id } = req.params;

  try {
    const data = await prisma.rateRes.findMany({
      where: {
        res_id: parseInt(res_id),
      },
    });

    if (data.length > 0) {
      return successCode(
        res,
        data,
        "Lấy danh sách rate thành công!"
      );
    } else {
      return failCode(res, "Không có dữ liệu!");
    }
  } catch (error) {
    prisma.$disconnect();
    return errorCode(res, error.message);
  }
}

module.exports = {
  getAllRates,
  getRateByUserId,
  getRateByResId,
  createRateRes
}