const express = require('express');

const { nameAuth, quantityAuth } = require('../middlewares');
const ProductController = require('../controllers/productController');

const router = express.Router();

router.get('/:id', ProductController.getById);
router.get('/', ProductController.getAll);
router.post('/', [
  nameAuth,
  quantityAuth,
  ProductController.create,
]);
router.put('/:id', [
  nameAuth,
  quantityAuth,
  ProductController.update,
]);
router.delete('/:id', ProductController.remove);

module.exports = router;