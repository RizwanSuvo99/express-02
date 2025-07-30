export const notFoundHandler = (_req, _res, next) => {
  const error = new Error('Resource Not Found');
  error.status = 404;
  next(error);
};

export const errorHandler = (error, _req, res, _next) => {
  if (error.status) {
    res.status(error.status).json({
      message: error.message,
    });
  }

  res.status(500).json({
    message: 'Something went wrong',
  });
};
