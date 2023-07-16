const express = require("express");
const router = express.Router();
const { validationResult, check } = require("express-validator");
const response = require("../utils/response");
const authMiddleware = require("../middlewares/auth.middleware");
const { send, verify } = require("../controllers/verify.controller");

router.post(
  "/send",
  authMiddleware,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Eğer hata varsa, hatanın içindeki sadece msg değerini döndür.
      const errorArray = [];
      errors.array().map((err) => errorArray.push(err.msg));
      return response.badRequest(res, errorArray);
    }
    next();
  },
  send
);

router.get(
  "/:code/:user_uuid",
  [
    check("code").notEmpty().withMessage("Doğrulama kodu geçersiz."),
    check("user_uuid").isUUID().withMessage("Kullanıcı ID'si geçersiz."),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Eğer hata varsa, hatanın içindeki sadece msg değerini döndür.
      const errorArray = [];
      errors.array().map((err) => errorArray.push(err.msg));
      return response.badRequest(res, errorArray);
    }
    next();
  },
  verify
);

module.exports = router;
