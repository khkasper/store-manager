const rescue = require('express-rescue');
const ProductService = require('../services/productService');
const { CREATED, OK } = require('../utils/statusDictionary');

const create = rescue(async (req, res, _next) => {
  const { name, quantity } = req.body;
  const product = await ProductService.create(name, quantity);
  return res.status(CREATED).json({ id: product.id, name, quantity });
});

const getById = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const product = await ProductService.getById(id);
  return res.status(OK).json(product);
});

const getAll = rescue(async (_req, res, _next) => {
  const products = await ProductService.getAll();
  return res.status(OK).json(products);
});

module.exports = {
  create,
  getById,
  getAll,
};