const Users = require("../models/Users");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const login = async (user = {}) => {
  try {
    const checkUserIsExist = await Users.findOne({
      where: {
        email: user.email,
      },
    });
    // Kullanıcı mevcut değil ise.
    if (!checkUserIsExist) {
      throw new Error("Kullanıcı bulunamadı.");
    }

    // Kullanıcı aktif değil ise.
    if (checkUserIsExist.is_active === 0) {
      throw new Error("Kullanıcı aktif değil.");
    }
    // Gelen password ile db'deki password'u karşılaştır.
    const compare = await bcrypt.compare(
      user.password,
      checkUserIsExist.password
    );
    if (!compare) {
      throw new Error("Şifre hatalı.");
    }

    // JWT Token oluştur.
    checkUserIsExist.dataValues.access_token = await generateAuthToken(
      checkUserIsExist.dataValues
    );

    return checkUserIsExist;
  } catch (err) {
    throw err;
  }
};
const register = async (user = {}) => {
  try {
    const checkUserifExist = await Users.findOne({
      where: {
        email: user.email,
      },
    });
    // Kullanıcı mevcutsa.
    if (checkUserifExist) {
      throw new Error("Bu e-posta adresi zaten kullanılıyor.");
    }
    const hashPassword = await bcrypt.hash(user.password, 5);
    const userData = {
      fullname: user.fullname,
      email: user.email,
      password: hashPassword,
      is_active: 1,
      is_verified: 0,
    };
    return await Users.create(userData);
  } catch (err) {
    throw err;
  }
};
const generateAuthToken = async (user = {}) => {
  try {
    const token = jwt.sign(
      {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    return token;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  login,
  register,
  generateAuthToken,
};
