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

const update = async (uuid, data) => {
  try {
    const checkPackageIsExist = await Packages.findOne({
      where: {
        uuid: uuid,
      },
    });
    if (!checkPackageIsExist) {
      throw new Error("NOTHING_FOUND");
    }

    return await Packages.update(
      {
        title: data.title || checkPackageIsExist.title,
        max_domains: data.max_domains || checkPackageIsExist.max_domains,
        price: data.price || checkPackageIsExist.price,
        description: data.description || checkPackageIsExist.description,
        is_active:
          typeof data.is_active !== "undefined"
            ? data.is_active
            : checkPackageIsExist.is_active,
        img_url: data.img_url || checkPackageIsExist.img_url,
      },
      {
        where: {
          uuid: uuid,
        },
      }
    );
  } catch (err) {
    throw err;
  }
};

const remove = async (uuid) => {
  try {
    const checkPackageIsExist = await Packages.findOne({
      where: {
        uuid: uuid,
      },
    });

    if (!checkPackageIsExist) {
      throw new Error("NOTHING_FOUND");
    }

    return await Packages.destroy({
      where: {
        uuid: uuid,
      },
    });
  } catch (err) {
    throw err;
  }
};
module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
