const Packages = require("../models/Packages");

const getAll = async () => {
  try {
    return await Packages.findAll({
      where: {
        is_active: true,
      },
    });
  } catch (err) {
    throw err;
  }
};

const getOne = async (uuid) => {
  try {
    const data = await Packages.findOne({
      where: {
        uuid: uuid,
        is_active: true,
      },
    });
    if (!data) {
      throw new Error("NOTHING_FOUND");
    }
    return data;
  } catch (err) {
    throw err;
  }
};

const create = async (data = {}) => {
  try {
    const checkPackageIsExist = await Packages.findOne({
      where: {
        title: data.title,
      },
    });
    if (checkPackageIsExist) {
      throw new Error("IS_EXIST");
    }
    return await Packages.create({
      title: data.title,
      max_domains: data.max_domains,
      price: data.price,
    });
  } catch (err) {
    throw err;
  }
};
module.exports = {
  getAll,
  getOne,
  create,
};
