# 📋 API de Cadastro

API REST para gerenciamento de cadastros de usuários.

## 🚀 Como rodar

```bash
npm install
npm run dev     # desenvolvimento (nodemon)
npm start       # produção
```

## 📁 Estrutura

```
src/
├── server.js                      # Entry point
├── app.js                         # Configuração do Express
├── routes/
│   └── cadastro.routes.js         # Definição das rotas
├── controllers/
│   └── cadastro.controller.js     # Lógica de negócio
└── middlewares/
    ├── validarCadastro.js          # Validação dos dados
    └── errorHandler.js             # Tratamento global de erros
```

## 📌 Endpoints

### `POST /api/v1/cadastros`
Cria um novo cadastro.

**Body:**
```json
{
  "nome": "Pedro Henrique",
  "idade": 22,
  "email": "pedro@email.com",
  "cep": "74000000",
  "senha": "minhasenha123",
  "confirmSenha": "minhasenha123"
}
```

**Resposta 201:**
```json
{
  "message": "Cadastro criado com sucesso",
  "cadastro": {
    "id": "uuid-gerado",
    "nome": "Pedro Henrique",
    "idade": 22,
    "email": "pedro@email.com",
    "cep": "74000000",
    "criadoEm": "2026-04-07T12:00:00.000Z"
  }
}
```

**Resposta 400 (validação):**
```json
{
  "error": "Erro de validação",
  "detalhes": [
    { "field": "nome", "message": "Nome é obrigatório" },
    { "field": "cep", "message": "CEP deve conter exatamente 8 dígitos numéricos" }
  ]
}
```

---

### `GET /api/v1/cadastros`
Lista todos os cadastros.

---

### `GET /api/v1/cadastros/:id`
Busca um cadastro pelo ID.

---

### `DELETE /api/v1/cadastros/:id`
Remove um cadastro pelo ID.

---

## 🐛 Bugs corrigidos em relação ao original

| Bug | Original | Corrigido |
|-----|----------|-----------|
| Typo em `length` | `senha.lenght` | `senha.length` |
| Regex CEP inválida | `/^\d{8$/` | `/^\d{8}$/` |
| Regex email com `\a` | `/[^\a@]/` | `/[^\s@]/` |
| Mensagem errada no CEP | "Senha é obrigatória" | "CEP deve conter 8 dígitos" |
| IDs não únicos | `Math.random()` | `uuid v4` |
| Crash se senha undefined | `senha.lenght` sem guard | validação prévia com guard |
| Sem validação acumulada | Para no 1º erro | Retorna todos os erros |
