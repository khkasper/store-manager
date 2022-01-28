const rescue = require('express-rescue');
const SaleService = require('../services/saleService');
const serialize = require('../utils/serialize');
const { CREATED } = require('../utils/statusDictionary');

const create = rescue(async (req, res) => {
    const sales = serialize(req.body);
    const { id } = await SaleService.create(sales);
    return res.status(CREATED).json({ id, itemsSold: req.body });
});

module.exports = {
  create,
};