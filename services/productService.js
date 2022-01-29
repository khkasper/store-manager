const ProductModel = require('../models/productModel');
const { CONFLICT, NOT_FOUND } = require('../utils/statusDictionary');

const ERR_404 = {
  status: NOT_FOUND,
  message: 'Product not found',
};

const ERR_409 = {
  status: CONFLICT,
  message: 'Product already exists',
};

const create = async (name, quantity) => {
  const product = await ProductModel.getByName(name);

  if (product) throw ERR_409;

  const createdProduct = await ProductModel.create(name, quantity);
  return { id: createdProduct.id };
};

const getById = async (id) => {
  const product = await ProductModel.getById(id);

  if (product === undefined) throw ERR_404;

  return product;
};

const getAll = async () => {
  const products = await ProductModel.getAll();
  return products;
};

const update = async (id, name, quantity) => {
  const product = await ProductModel.update(id, name, quantity);

  if (product === undefined) throw ERR_404;

  return product;
};

const remove = async (id) => {
  const productId = await ProductModel.getById(id);
  await ProductModel.remove(id);

  if (productId === undefined) throw ERR_404;

  return productId;
};

module.exports = {
  create,
  getById,
  getAll,
  update,
  remove,
};