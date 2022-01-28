const express = require('express');

const { saleAuth, saleQuantityAuth } = require('../middlewares');
const SaleController = require('../controllers/saleController');

const router = express.Router();

router.post('/', [
  saleAuth,
  saleQuantityAuth,
  SaleController.create,
]);

module.exports = router;