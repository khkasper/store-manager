const ProductModel = require('../models/productModel');
const { CONFLICT } = require('../utils/statusDictionary');

const ERR_409 = {
      status: CONFLICT,
      message: 'Product already exists',
    };

const create = async (name, quantity) => {
  const product = await ProductModel.getByName(name);

  if (product) {
    throw ERR_409;
  }

  const createdProduct = await ProductModel.create(name, quantity);
  return { id: createdProduct.id };
};

module.exports = {
  create,
};