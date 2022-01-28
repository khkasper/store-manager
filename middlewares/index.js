const errorMiddleware = require('./errorMiddleware');
const nameAuth = require('./nameAuth');
const quantityAuth = require('./quantityAuth');
const saleAuth = require('./saleAuth');
const saleQuantityAuth = require('./saleQuantityAuth');

module.exports = {
  errorMiddleware,
  nameAuth,
  quantityAuth,
  saleAuth,
  saleQuantityAuth,
};