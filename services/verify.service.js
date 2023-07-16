const { Op } = require("sequelize");
const Users = require("../models/Users");
const UserVerification = require("../models/UserVerification");
const { generateVerificationToken } = require("../utils/token.helper");
const sequelize = require("../models");

const send = async (email) => {
  try {
    const checkUserIsExist = await Users.findOne({
      where: {
        email: email,
      },
    });
    // Kullanıcı mevcut değil ise.
    if (!checkUserIsExist) {
      throw new Error("USER_NOT_FOUND");
    }

    // Kullanıcı aktif değil ise.
    if (checkUserIsExist.is_active === 0) {
      throw new Error("NO_PERMISSION");
    }

    // Kullanıcı doğrulanmış ise.
    if (checkUserIsExist.is_verified === 1) {
      throw new Error("USER_ALREADY_VERIFIED");
    }

    // User verification'da son 15 dakika içerisinde oluşturulmuş bir kod var ise hata fırlat
    const checkUserVerificationIsExist = await UserVerification.findOne({
      where: {
        user_uuid: checkUserIsExist.uuid,
        is_success: 0,
        createdAt: {
          [Op.gt]: sequelize.literal("DATE_SUB(NOW(), INTERVAL 15 MINUTE)"),
        },
      },
    });

    //  15 dakika içerisinde doğrulama kodu gönderilmiş ise.
    if (checkUserVerificationIsExist) {
      throw new Error("IS_EMAIL_ALREADY_SENT");
    }

    // Gönderilmemiş ise yeni bir doğrulama kodu oluştur
    const verificationCode = await generateVerificationToken();

    // User verification tablosuna kaydet
    return await UserVerification.create({
      code: verificationCode,
      is_success: 0,
      user_uuid: checkUserIsExist.uuid,
    });
  } catch (err) {
    throw err;
  }
};

const verify = async (code, user_uuid) => {
  try {
    // Kullanıcının kodunun geçerliliğine bak
    const checkUserVerificationIsExist = await UserVerification.findOne({
      where: {
        user_uuid: user_uuid,
        code: code,
        is_success: 0,
      },
    });

    if (!checkUserVerificationIsExist) {
      throw new Error("CODE_NOT_FOUND");
    }

    // Kullanıcı doğrulanmış olarak işaretle
    await Users.update(
      {
        is_verified: 1,
      },
      {
        where: {
          uuid: user_uuid,
        },
      }
    );

    // Doğrulama kodunu kullanılmış olarak işaretle
    await UserVerification.update(
      {
        is_success: 1,
      },
      {
        where: {
          user_uuid: user_uuid,
          code: code,
        },
      }
    );

    return true;
  } catch (err) {
    throw err;
  }
};
module.exports = {
  send,
  verify,
};
