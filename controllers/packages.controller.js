const response = require("../utils/response");
const packagesService = require("../services/packages.service");

const getAll = async (req, res) => {
  try {
    const data = await packagesService.getAll();
    const packageData = [];

    data.map((item) => {
      delete item.dataValues.id;
      delete item.dataValues.user_id;
      delete item.dataValues.is_active;
      delete item.dataValues.createdAt;
      delete item.dataValues.updatedAt;
      packageData.push(item.dataValues);
    });
    return response.success(res, packageData);
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

const getOne = async (req, res) => {
  try {
    const data = await packagesService.getOne(req.params.uuid);
    delete data.dataValues.id;
    delete data.dataValues.user_id;
    delete data.dataValues.createdAt;
    delete data.dataValues.is_active;
    delete data.dataValues.updatedAt;
    return response.success(res, data);
  } catch (err) {
    if (err.message === "NOTHING_FOUND") {
      return response.notFound(res, "Paket bulunamadı.");
    }
    return response.badRequest(res, err.message);
  }
};

const create = async (req, res) => {
  try {
    const data = await packagesService.create(req.body);

    // Gereksiz dataları sil.
    delete data.dataValues.id;
    delete data.dataValues.user_id;
    delete data.dataValues.createdAt;
    delete data.dataValues.updatedAt;

    return response.success(res, data);
  } catch (err) {
    if (err.message === "IS_EXIST") {
      return response.conflict(res, "Paket zaten mevcut.");
    }
    return response.badRequest(res, err.message);
  }
};

module.exports = {
  getAll,
  create,
  getOne,
};
