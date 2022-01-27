const { INTERNAL_SERVER_ERROR } = require('../utils/statusDictionary');

const errorMiddleware = (err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json({
      message: err.message,
    });
  }
  return res.status(INTERNAL_SERVER_ERROR).json(err);
};

module.exports = errorMiddleware;