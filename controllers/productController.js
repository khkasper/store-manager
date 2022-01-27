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

const update = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  await ProductService.getById(id);
  await ProductService.update(id, name, quantity);
  return res.status(OK).json({ id, name, quantity });
});

const remove = rescue(async (req, res, _next) => {
  const { id } = req.params;
  await ProductService.getById(id);
  const product = await ProductService.remove(id);
  console.log(product);
  return res.status(OK).json(product);
});

module.exports = {
  create,
  getById,
  getAll,
  update,
  remove,
};