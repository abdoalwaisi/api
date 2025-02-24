const notFoundMiddleware = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: "The requested URL was not found on this server.",
  });
};

// Export the middleware
module.exports = notFoundMiddleware;
