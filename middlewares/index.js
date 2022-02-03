const errorMiddleware = require('./errorMiddleware');
const productNameValidation = require('./productNameValidation');
const productQuantityValidation = require('./productQuantityValidation');
const saleValidation = require('./saleValidation');
const saleQuantityValidation = require('./saleQuantityValidation');

module.exports = {
  errorMiddleware,
  productNameValidation,
  productQuantityValidation,
  saleValidation,
  saleQuantityValidation,
};