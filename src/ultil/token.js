const jwt = require("jsonwebtoken");
const { failAuthenticationCode } = require("../config/response");

const createToken = (data) => {
  let token = jwt.sign({ content: data }, 'your-secret-key', {
    expiresIn: "5d",
    algorithm: "HS256",
  });

  console.log(token);
  return token;
};

const verifyToken = (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let checkedToken = jwt.verify(token, 'your-secret-key');
    if (checkedToken) {
      req.user = checkedToken;
      next();
    }
  } catch (err) {
    failAuthenticationCode(res, err.message);
  }
};

module.exports = {
  createToken,
  verifyToken,
};