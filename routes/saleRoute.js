const express = require('express');

const { saleAuth, saleQuantityAuth } = require('../middlewares');
const SaleController = require('../controllers/saleController');

const router = express.Router();

router.get('/:id', SaleController.getById);
router.get('/', SaleController.getAll);
router.post('/', [
  saleAuth,
  saleQuantityAuth,
  SaleController.create,
]);

module.exports = router;