const express = require("express");
const router = express.Router();
const { validationResult, check } = require("express-validator");

const response = require("../utils/response");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  getAll,
  create,
  getOne,
  update,
  remove,
} = require("../controllers/packages.controller");

router.get(
  "/",
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
  getAll
);
router.get(
  "/:uuid",
  [
    check("uuid").notEmpty().withMessage("UUID boş bırakılamaz."),
    check("uuid").isUUID().withMessage("UUID formatı hatalı."),
  ],
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
  getOne
);

router.post(
  "/add",
  [
    check("title")
      .notEmpty()
      .isLength({ max: 105 })
      .withMessage("Başlık boş bırakılamaz."),
    check("max_domains")
      .notEmpty()
      .isInt()
      .withMessage("Domain sınırı boş bırakılamaz."),
    check("price").notEmpty().isFloat().withMessage("Fiyat boş bırakılamaz."),
  ],
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
  create
);

router.put(
  "/:uuid",
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
  update
);

router.delete(
  "/:uuid",
  [
    check("uuid").notEmpty().withMessage("UUID boş bırakılamaz."),
    check("uuid").isUUID().withMessage("UUID formatı hatalı."),
  ],
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
  remove
);

module.exports = router;
