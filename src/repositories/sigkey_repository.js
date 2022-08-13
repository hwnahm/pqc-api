const { SigkeyModel } = require('../models');

module.exports = {
  findById: async function (id) {
    let sigkey = await SigkeyModel.findOne({ _id: id });
    if (!sigkey) {
      return null;
    }
    return sigkey;
  },

  findAll: async function (findParams, pagination) {
    try {
      let sigkey = await SigkeyModel.find(findParams)
        .skip((pagination.page - 1) * pagination.perPage)
        .limit(pagination.perPage)
        .sort({ createdAt: -1, _id: 1 });
      return sigkey;
    } catch (error) {
      return error;
    }
  },

  create: async function (input) {
    try {
      let sigkey = await SigkeyModel.create(input);
      return sigkey;
    } catch (error) {
      return error;
    }
  },

  updateById: async function (id, where) {
    try {
      let sigkey = await SigkeyModel.updateOne({ _id: id }, { $set: where });
      return sigkey;
    } catch (error) {
      return error;
    }
  },

  findByUserid: async function (userid) {
    try {
      let sigkey = await SigkeyModel.find({ userid: userid }).sort({ createdAt: -1, _id: 1 });
      return sigkey;
    } catch (error) {
      return error;
    }
  },

  count: async function (where) {
    try {
      let count = await SigkeyModel.countDocuments(where);
      return count;
    } catch (error) {
      return error;
    }
  },

  delete: async function (id) {
    try {
      let deleteDocument = await SigkeyModel.deleteOne({ _id: id });
      return deleteDocument;
    } catch (error) {
      return error;
    }
  },

  deleteByUserid: async function (userid) {
    try {
      let deleteDocument = await SigkeyModel.deleteOne({ userid: userid });
      return deleteDocument;
    } catch (error) {
      return error;
    }
  },
};
