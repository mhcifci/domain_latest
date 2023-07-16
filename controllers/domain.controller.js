const response = require("../utils/response");
const domainsService = require("../services/domains.service");

const getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const data = await domainsService.getAll(req.user.id, page, pageSize);
    const totalCount = await domainsService.getCount(req.user.id);
    const totalPages = Math.ceil(totalCount / pageSize);
    const domainData = [];
    data.map((item) => {
      delete item.dataValues.id;
      delete item.dataValues.user_id;
      delete item.dataValues.createdAt;
      delete item.dataValues.updatedAt;
      domainData.push(item.dataValues);
    });

    return response.successwithPagination(
      res,
      {
        page,
        pageSize,
        totalCount,
        totalPages,
      },
      domainData
    );
  } catch (err) {
    return response.badRequest(res, err.message);
  }
};

const getOne = async (req, res) => {
  try {
    const data = await domainsService.getOne(req.user.id, req.params.uuid);
    delete data.dataValues.id;
    delete data.dataValues.user_id;
    delete data.dataValues.createdAt;
    delete data.dataValues.updatedAt;
    return response.success(res, data);
  } catch (err) {
    if (err.message === "NOTHING_FOUND") {
      return response.notFound(res, "Domain bulunamadı.");
    }
    return response.badRequest(res, err.message);
  }
};

const create = async (req, res) => {
  try {
    const data = await domainsService.create(req.user.id, req.body);
    // Gereksiz dataları sil.
    delete data.dataValues.id;
    delete data.dataValues.user_id;
    delete data.dataValues.createdAt;
    delete data.dataValues.updatedAt;

    return response.success(res, data);
  } catch (err) {
    if (err.message === "IS_EXIST") {
      return response.conflict(res, "Domain zaten kayıtlı.");
    }
    return response.badRequest(res, err.message);
  }
};

const update = async (req, res) => {
  try {
    await domainsService.update(req.user.id, req.params.uuid, req.body);

    const data = await domainsService.getOne(req.user.id, req.params.uuid);
    delete data.dataValues.id;
    delete data.dataValues.user_id;
    delete data.dataValues.createdAt;
    delete data.dataValues.updatedAt;
    return response.success(res, data);
  } catch (err) {
    if (err.message === "NOTHING_FOUND") {
      return response.badRequest(res, "Domain bulunamadı.");
    }
    if (err.message === "IS_EXIST") {
      return response.conflict(res, "Domain zaten kayıtlı.");
    }
    return response.badRequest(res, err.message);
  }
};

const remove = async (req, res) => {
  try {
    await domainsService.remove(req.user.id, req.params.uuid);
    return response.success(res, null, null);
  } catch (err) {
    if (err.message === "NOTHING_FOUND") {
      return response.badRequest(res, "Domain bulunamadı.");
    }

    return response.badRequest(res, err.message);
  }
};

module.exports = {
  getAll,
  create,
  getOne,
  update,
  remove,
};
