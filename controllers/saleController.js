const rescue = require('express-rescue');
const SaleService = require('../services/saleService');
const serialize = require('../utils/serialize');
const { CREATED, OK, NOT_FOUND } = require('../utils/statusDictionary');

const create = rescue(async (req, res) => {
  const sales = serialize(req.body);
  const { id } = await SaleService.create(sales);
  return res.status(CREATED).json({ id, itemsSold: req.body });
});

const getAll = rescue(async (_req, res) => {
  const sales = await SaleService.getAll();
  return res.status(OK).json(sales);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;
  const sale = await SaleService.getById(id);

  if (!sale[0]) {
    return res.status(NOT_FOUND).json({ message: 'Sale not found' });
  }

  return res.status(OK).json(sale);
});

const update = rescue(async (req, res) => {
  const [sale] = serialize(req.body);
  const { id } = req.params;
  await SaleService.update({ id, ...sale });
  return res.status(OK).json({ saleId: id, itemUpdated: req.body });
});

module.exports = {
  create,
  getAll,
  getById,
  update,
};