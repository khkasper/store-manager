const express = require('express');

const { saleValidation, saleQuantityValidation } = require('../middlewares');
const SaleController = require('../controllers/saleController');

const router = express.Router();

router.get('/:id', SaleController.getById);
router.get('/', SaleController.getAll);
router.post('/', [
  saleValidation,
  saleQuantityValidation,
  SaleController.create,
]);
router.put('/:id', [
  saleValidation,
  saleQuantityValidation,
  SaleController.update,
]);
router.delete('/:id', SaleController.remove);

module.exports = router;