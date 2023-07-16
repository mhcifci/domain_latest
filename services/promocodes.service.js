const PromoCodes = require("../models/PromoCodes");

const getAll = async () => {
  try {
    return await PromoCodes.findAll({
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
    const data = await PromoCodes.findOne({
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
    const checkPromoCodeIsExist = await PromoCodes.findOne({
      where: {
        title: data.title,
        code: data.code,
      },
    });
    if (checkPromoCodeIsExist) {
      throw new Error("IS_EXIST");
    }
    return await PromoCodes.create({
      title: data.title,
      code: data.code,
      discount: data.discount,
      description: data.description || null,
    });
  } catch (err) {
    throw err;
  }
};

const update = async (uuid, data) => {
  try {
    const checkPromoCodeIsExist = await PromoCodes.findOne({
      where: {
        uuid: uuid,
      },
    });
    if (!checkPromoCodeIsExist) {
      throw new Error("NOTHING_FOUND");
    }

    return await PromoCodes.update(
      {
        title: data.title,
        code: data.code,
        discount: data.discount,
        description: data.description || null,
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
    const checkPromoCodeIsExist = await PromoCodes.findOne({
      where: {
        uuid: uuid,
      },
    });

    if (!checkPromoCodeIsExist) {
      throw new Error("NOTHING_FOUND");
    }

    return await PromoCodes.destroy({
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
