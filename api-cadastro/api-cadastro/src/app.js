const express = require('express');
const cadastroRoutes = require('./routes/cadastro.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

// Rotas
app.use('/api/v1', cadastroRoutes);

// Rota não encontrada
app.use((req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    path: req.originalUrl,
  });
});

// Handler global de erros
app.use(errorHandler);

module.exports = app;
