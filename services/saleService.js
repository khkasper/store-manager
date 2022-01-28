const SaleModel = require('../models/saleModel');

const create = async (sales) => {
  const { id } = await SaleModel.createSaleDate(new Date());
  const salesResult = sales.map(async ({ productId, quantity }) => {
    await SaleModel.create(id, productId, quantity);
  });

  await Promise.all(salesResult);

  return { id };
};

const getAll = async () => {
  const sales = await SaleModel.getAll();
  return sales;
};

const getById = async (id) => {
  const sale = await SaleModel.getById(id);
  return sale;
};

const update = async ({ id, productId, quantity }) => {
  const sale = await SaleModel.update(id, productId, quantity);
  return sale;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};