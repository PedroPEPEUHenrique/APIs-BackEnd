// Regex corrigidos
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CEP_REGEX = /^\d{8}$/; // Corrigido: estava "/^\d{8$/" (sintaxe inválida)

/**
 * Coleta todos os erros de validação antes de responder,
 * evitando que o cliente precise corrigir um campo por vez.
 */
function validarCadastro(req, res, next) {
  const { nome, idade, email, cep, senha, confirmSenha } = req.body;
  const erros = [];

  // — Nome —
  if (!nome || typeof nome !== 'string' || nome.trim().length === 0) {
    erros.push({ field: 'nome', message: 'Nome é obrigatório' });
  } else if (nome.trim().length < 2) {
    erros.push({ field: 'nome', message: 'Nome deve ter pelo menos 2 caracteres' });
  }

  // — E-mail —
  if (!email) {
    erros.push({ field: 'email', message: 'E-mail é obrigatório' });
  } else if (!EMAIL_REGEX.test(email)) {
    erros.push({ field: 'email', message: 'Formato de e-mail inválido' });
  }

  // — CEP —
  if (!cep) {
    erros.push({ field: 'cep', message: 'CEP é obrigatório' });
  } else if (!CEP_REGEX.test(String(cep))) {
    // Corrigido: a mensagem antes dizia "Senha é obrigatória" por engano
    erros.push({ field: 'cep', message: 'CEP deve conter exatamente 8 dígitos numéricos' });
  }

  // — Idade —
  if (idade === undefined || idade === null) {
    erros.push({ field: 'idade', message: 'Idade é obrigatória' });
  } else if (!Number.isInteger(idade) || idade < 16 || idade > 120) {
    erros.push({ field: 'idade', message: 'Idade deve ser um número inteiro entre 16 e 120' });
  }

  // — Senha —
  if (!senha) {
    erros.push({ field: 'senha', message: 'Senha é obrigatória' });
  } else if (senha.length < 6 || senha.length > 20) {
    // Corrigido: "lenght" → "length"; limite aumentado para 20 (10 era muito restritivo)
    erros.push({ field: 'senha', message: 'Senha deve ter entre 6 e 20 caracteres' });
  }

  // — Confirmação de senha —
  if (!confirmSenha) {
    erros.push({ field: 'confirmSenha', message: 'Confirmação de senha é obrigatória' });
  } else if (senha && senha !== confirmSenha) {
    erros.push({ field: 'confirmSenha', message: 'As senhas não coincidem' });
  }

  if (erros.length > 0) {
    return res.status(400).json({
      error: 'Erro de validação',
      detalhes: erros,
    });
  }

  next();
}

module.exports = validarCadastro;
