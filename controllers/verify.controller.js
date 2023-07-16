const response = require("../utils/response");
const verifyService = require("../services/verify.service");

const send = async (req, res) => {
  try {
    const data = await verifyService.send(req.user.email);
    return response.success(res, data);
  } catch (err) {
    if (err.message === "IS_EMAIL_ALREADY_SENT") {
      return response.badRequest(
        res,
        "Bu e-posta adresine zaten doğrulama kodu gönderilmiş."
      );
    }
    if (err.message === "USER_ALREADY_VERIFIED") {
      return response.badRequest(res, "Bu kullanıcı zaten doğrulanmış.");
    }
    if (err.message === "NO_PERMISSION") {
      return response.badRequest(
        res,
        "Kullanıcı için bu eyleme müsaade edilememektedir."
      );
    }
    if (err.message === "USER_NOT_FOUND") {
      return response.badRequest(res, "Kullanıcı bulunamadı.");
    }
    return response.badRequest(res, err.message);
  }
};

const verify = async (req, res) => {
  try {
    const data = await verifyService.verify(
      req.params.code,
      req.params.user_uuid
    );
    return response.success(res, data);
  } catch (err) {
    if (err.message === "CODE_NOT_FOUND") {
      return response.badRequest(
        res,
        "Doğrulama kodu bulunamadı. Geçersiz veya süresi dolmuş olabilir."
      );
    }
    return response.badRequest(res, err.message);
  }
};

module.exports = {
  send,
  verify,
};
