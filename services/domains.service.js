const Domains = require("../models/Domains");
const { validateURL } = require("../utils/url.helper");

const getAll = async (user, page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    return await Domains.findAll({
      where: {
        user_id: user,
      },
      offset,
      limit,
    });
  } catch (err) {
    throw err;
  }
};
const getOne = async (user, uuid) => {
  try {
    const data = await Domains.findOne({
      where: {
        user_id: user,
        uuid: uuid,
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
const getCount = async (user) => {
  try {
    return await Domains.count({
      where: {
        user_id: user,
      },
    });
  } catch (err) {
    throw err;
  }
};
const create = async (user, data = {}) => {
  try {
    await validateURL(data.domain);
    const checkDomainIsExist = await Domains.findOne({
      where: {
        user_id: user,
        domain: data.domain,
      },
    });
    if (checkDomainIsExist) {
      throw new Error("IS_EXIST");
    }
    return await Domains.create({
      user_id: user,
      domain: data.domain,
      description: data.description || null,
      is_banned: 0,
    });
  } catch (err) {
    throw err;
  }
};
const update = async (user, uuid, data = {}) => {
  try {
    const checkDomainIsExist = await Domains.findOne({
      where: {
        user_id: user,
        uuid: uuid,
      },
    });
    if (!checkDomainIsExist) {
      throw new Error("NOTHING_FOUND");
    }

    if (data.domain) {
      // Değiştirilecek olan domain mevcut mu?
      const checkDomainIsExist2 = await Domains.findOne({
        where: {
          user_id: user,
          domain: data.domain,
        },
      });
      if (checkDomainIsExist2) {
        throw new Error("IS_EXIST");
      }
      await validateURL(data.domain);
    }

    return await Domains.update(
      {
        domain: data.domain || checkDomainIsExist.domain,
        description: data.description || checkDomainIsExist.description,
      },
      {
        where: {
          user_id: user,
          uuid: uuid,
        },
      }
    );
  } catch (err) {
    throw err;
  }
};
const remove = async (user, uuid) => {
  try {
    const checkDomainIsExist = await Domains.findOne({
      where: {
        user_id: user,
        uuid: uuid,
      },
    });

    if (!checkDomainIsExist) {
      throw new Error("NOTHING_FOUND");
    }

    return await Domains.destroy({
      where: {
        user_id: user,
        uuid: uuid,
      },
    });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAll,
  create,
  getCount,
  getOne,
  update,
  remove,
};
