const config = require('config');
const NODE_APP_STATUS = config.get('NODE_APP_STATUS');

const errorMiddleware = (err, req, res, next) => {
  console.log('middleware work');
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: NODE_APP_STATUS === 'production' ? null : err.stack,
  });
  next();
};

module.exports = { errorMiddleware };
