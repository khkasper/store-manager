const rescue = require('express-rescue');
const ProductService = require('../services/productService');
const { CREATED } = require('../utils/statusDictionary');

const create = rescue(async (req, res, _next) => {
  const { name, quantity } = req.body;

    const product = await ProductService.create(name, quantity);

    return res.status(CREATED).json({ id: product.id, name, quantity });
});

module.exports = {
  create,
};