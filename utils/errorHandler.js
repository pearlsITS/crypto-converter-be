const errorHandler = (res, error) => {
  let statusCode = 500;
  if (error.status.error_code) {
    statusCode = error.status.error_code;
  }
  res.status(statusCode).json({ error });
};

module.exports = errorHandler;
