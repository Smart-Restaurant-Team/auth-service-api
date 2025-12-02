export default (err, req, res, next) => {
  console.error(err);

  const status = err.statusCode || 500;

  res.status(status).json({
    success: false,
    message: req.t(`errors.${err.key || "server_error"}`),
    code: err.key || "server_error"
  });
};