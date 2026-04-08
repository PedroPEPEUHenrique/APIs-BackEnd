// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error(`[ERRO] ${err.stack || err.message}`);

  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Erro interno do servidor',
  });
}

module.exports = errorHandler;
