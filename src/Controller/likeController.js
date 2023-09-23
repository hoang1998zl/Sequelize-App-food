const { PrismaClient } = require("@prisma/client");
const { successCode, errorCode, failCode } = require("../config/response");
const prisma = new PrismaClient();

const getAllLikes = async (req, res) => {
  try {
    const likes = await prisma.likeRes.findMany();
    prisma.$disconnect();
    if (likes.length > 0) {
      return successCode(
        res,
        likes,
        "Lấy danh sách like thành công!"
      );
    } else {
      return failCode(res, "Không có dữ liệu!");
    }
  } catch (error) {
    prisma.$disconnect();
    return errorCode(res, error.message);
  }
};

const getLikeByUserId = async (req, res) => {
  const { user_id } = req.params;

  try {
    const data = await prisma.likeRes.findMany({
      where: {
        user_id: parseInt(user_id),
      },
      select: {
        user_id: true,
        date_like: true,
        restaurant: {
          select: {
            res_id: true,
            res_name: true,
            image: true,
            description: true,
          },
        },
      },
    });

    if (data.length > 0) {
      return successCode(
        res,
        data,
        "Lấy danh sách like thành công!"
      );
    } else {
      return failCode(res, "Không có dữ liệu!");
    }
  } catch (error) {
    prisma.$disconnect();
    return errorCode(res, error.message);
  }
}

const getLikeByResId = async (req, res) => {
  const { res_id } = req.params;

  try {
    const data = await prisma.likeRes.findMany({
      where: {
        res_id: parseInt(res_id),
      },
      select: {
        res_id: true,
        date_like: true,
        user: {
          select: {
            user_id: true,
            full_name: true,
            email: true,
          },
        },
      },
    });

    if (data.length > 0) {
      return successCode(
        res,
        data,
        "Lấy danh sách like thành công!"
      );
    } else {
      return failCode(res, "Không có dữ liệu!");
    }
  } catch (error) {
    prisma.$disconnect();
    return errorCode(res, error.message);
  }
}

module.exports = { getAllLikes, getLikeByUserId, getLikeByResId }