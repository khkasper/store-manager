const express = require('express');

const { nameAuth, quantityAuth } = require('../middlewares');
const ProductController = require('../controllers/productController');

const router = express.Router();

router.post('/', [
  nameAuth,
  quantityAuth,
  ProductController.create,
]);

module.exports = router;