const express = require("express");
const { login, register } = require("../controllers/auth.controller.js");
const response = require("../utils/response");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.post(
  "/login",
  [
    body("email").notEmpty().withMessage("E-posta boş bırakılamaz."),
    body("email").isEmail().withMessage("E-posta formatı hatalı."),
    body("password").notEmpty().withMessage("Şifre boş bırakılamaz."),
    body("password")
      .isLength({ min: 8, max: 16 })
      .withMessage("Şifre minimum 6 rakam, maksimum 16 rakam olmalı."),
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
  login
);

router.post(
  "/register",
  [
    body("fullname").notEmpty().withMessage("Ad soyad boş bırakılamaz."),
    body("email").notEmpty().withMessage("E-posta boş bırakılamaz."),
    body("email").isEmail().withMessage("E-posta formatı hatalı."),
    body("password").notEmpty().withMessage("Şifre boş bırakılamaz."),
    body("password")
      .isLength({ min: 8, max: 16 })
      .withMessage("Şifre minimum 6 rakam, maksimum 16 rakam olmalı."),
    body("repassword").notEmpty().withMessage("Şifre tekrarı boş bırakılamaz."),
    body("repassword")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Şifreler eşleşmiyor.");
        }
        return true;
      })
      .withMessage("Şifreler eşleşmiyor."),
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
  register
);

module.exports = router;
