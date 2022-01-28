const SaleModel = require('../models/saleModel');

const create = async (sales) => {
  const { id } = await SaleModel.createSaleDate(new Date());
  const result = sales.map(async ({ productId, quantity }) => {
    await SaleModel.create(id, productId, quantity);
  });

  await Promise.all(result);

  return { id };
};

module.exports = {
  create,
};