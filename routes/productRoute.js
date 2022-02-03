const express = require('express');

const { productNameValidation, productQuantityValidation } = require('../middlewares');
const ProductController = require('../controllers/productController');

const router = express.Router();

router.get('/:id', ProductController.getById);
router.get('/', ProductController.getAll);
router.post('/', [
  productNameValidation,
  productQuantityValidation,
  ProductController.create,
]);
router.put('/:id', [
  productNameValidation,
  productQuantityValidation,
  ProductController.update,
]);
router.delete('/:id', ProductController.remove);

module.exports = router;