const { Router } = require('express');
const cadastroController = require('../controllers/cadastro.controller');
const validarCadastro = require('../middlewares/validarCadastro');

const router = Router();

// POST /api/v1/cadastros — cria um novo cadastro
router.post('/cadastros', validarCadastro, cadastroController.criar);

// GET /api/v1/cadastros — lista todos os cadastros
router.get('/cadastros', cadastroController.listar);

// GET /api/v1/cadastros/:id — busca cadastro por ID
router.get('/cadastros/:id', cadastroController.buscarPorId);

// DELETE /api/v1/cadastros/:id — remove um cadastro
router.delete('/cadastros/:id', cadastroController.remover);

module.exports = router;
