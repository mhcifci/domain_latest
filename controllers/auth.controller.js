const response = require("../utils/response");
const authService = require("../services/auth.service");

const login = async (req, res) => {
  try {
    const login = await authService.login(req.body);

    // Gereksiz dataları sil.
    delete login.dataValues.id;
    delete login.dataValues.password;
    delete login.dataValues.is_active;
    delete login.dataValues.is_verified;
    delete login.dataValues.createdAt;
    delete login.dataValues.updatedAt;

    return response.success(res, login);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

const register = async (req, res) => {
  try {
    const register = await authService.register(req.body);
    // Gereksiz dataları sil.
    delete register.dataValues.id;
    delete register.dataValues.password;
    delete register.dataValues.is_active;
    delete register.dataValues.is_verified;
    delete register.dataValues.createdAt;
    delete register.dataValues.updatedAt;

    return response.created(res, register);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

module.exports = {
  login,
  register,
};
