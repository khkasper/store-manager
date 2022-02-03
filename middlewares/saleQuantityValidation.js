const { BAD_REQUEST, UNPROCESSABLE_ENTITY } = require('../utils/statusDictionary');

module.exports = (req, res, next) => {
  const { body } = req;
  const noQtty = body.some(({ quantity }) => quantity === undefined);
  const invalidQtty = body.some(({ quantity }) => typeof quantity !== 'number' || quantity <= 0);

  if (noQtty) {
    return res.status(BAD_REQUEST).json({
      message: '"quantity" is required',
    });
  }

  if (invalidQtty) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      message: '"quantity" must be a number larger than or equal to 1',
    });
  }

  return next();
};