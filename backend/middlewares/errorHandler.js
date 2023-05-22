// Error handler for not found routes
const notFound = (req, res, next) => {
  const error = new Error(`Not Found ${req.originalUrl}.`);
  res.status(404);
  next(error);
};

// Custom general error handler
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  res.status(statusCode);
  console.log(err.message);
  res.json({
    errors: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };
