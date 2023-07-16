const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const response = require("../utils/response");

const authMiddleware = async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET
    );
    const user = await User.findOne({ where: { id: decodedToken.id } });

    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (err) {
    return response.unauthorized(res);
  }
};

module.exports = authMiddleware;
