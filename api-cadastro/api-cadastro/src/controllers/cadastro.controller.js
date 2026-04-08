const { v4: uuidv4 } = require('uuid');

// Armazenamento em memória (substitua por um banco de dados em produção)
const cadastros = new Map();

const cadastroController = {
  /**
   * POST /cadastros
   * Cria um novo cadastro.
   */
  criar(req, res, next) {
    try {
      const { nome, idade, email, cep } = req.body;
      // Nunca armazenamos a senha em texto puro numa aplicação real.
      // Aqui omitimos senha do retorno e usaríamos bcrypt num cenário com banco.

      // Verifica duplicidade de e-mail
      const emailJaCadastrado = [...cadastros.values()].some(
        (c) => c.email.toLowerCase() === email.toLowerCase()
      );
      if (emailJaCadastrado) {
        return res.status(409).json({
          error: 'Conflito',
          field: 'email',
          message: 'Este e-mail já está cadastrado',
        });
      }

      const id = uuidv4(); // Corrigido: Math.random() não garante unicidade
      const novoCadastro = {
        id,
        nome: nome.trim(),
        idade,
        email: email.toLowerCase().trim(),
        cep,
        criadoEm: new Date().toISOString(),
      };

      cadastros.set(id, novoCadastro);

      return res.status(201).json({
        message: 'Cadastro criado com sucesso',
        cadastro: novoCadastro,
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /cadastros
   * Retorna todos os cadastros.
   */
  listar(req, res, next) {
    try {
      const lista = [...cadastros.values()];
      return res.status(200).json({
        total: lista.length,
        cadastros: lista,
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * GET /cadastros/:id
   * Retorna um cadastro pelo ID.
   */
  buscarPorId(req, res, next) {
    try {
      const { id } = req.params;
      const cadastro = cadastros.get(id);

      if (!cadastro) {
        return res.status(404).json({
          error: 'Não encontrado',
          message: `Nenhum cadastro encontrado com o ID: ${id}`,
        });
      }

      return res.status(200).json({ cadastro });
    } catch (err) {
      next(err);
    }
  },

  /**
   * DELETE /cadastros/:id
   * Remove um cadastro pelo ID.
   */
  remover(req, res, next) {
    try {
      const { id } = req.params;

      if (!cadastros.has(id)) {
        return res.status(404).json({
          error: 'Não encontrado',
          message: `Nenhum cadastro encontrado com o ID: ${id}`,
        });
      }

      cadastros.delete(id);
      return res.status(200).json({ message: 'Cadastro removido com sucesso' });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = cadastroController;
