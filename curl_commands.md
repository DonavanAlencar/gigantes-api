# Comandos cURL para Sistema Gigantes BFF

Aqui estão os comandos cURL para testar todos os endpoints implementados no BFF.

## 1. Health Check
Verifica o status do sistema e das conexões (MySQL, Redis, WordPress).

```bash
curl -X GET http://localhost:3000/api/health \
  -H "Content-Type: application/json" \
  -v
```

**Resposta Esperada:**
Status 200 (se tudo estiver OK) ou 503 (se algo estiver degradado).
```json
{
  "status": "healthy",
  "checks": {
    "wordpress": true,
    "database": true,
    "redis": true,
    "timestamp": "2026-01-11T20:00:00.000Z"
  }
}
```

## 2. Produtos
Busca detalhes de um produto WooCommerce e seus cursos relacionados.

**Parâmetros:**
- `:id` -> ID do produto (ex: 496)

```bash
curl -X GET http://localhost:3000/api/products/496 \
  -H "Content-Type: application/json" \
  -v
```

**Resposta Esperada:**
Status 200.
```json
{
  "id": 496,
  "name": "Nome do Produto",
  "price": "99.90",
  "related_courses": [
    { "id": 2553, "title": "Curso A" }
  ]
}
```

## 3. Painel do Usuário (Dashboard)
Busca dados do usuário e progresso nos cursos (com Circuit Breaker para LearnDash).

**Parâmetros:**
- `:id` -> ID do usuário (ex: 1)

```bash
curl -X GET http://localhost:3000/api/users/1/dashboard \
  -H "Content-Type: application/json" \
  -v
```

**Resposta Esperada:**
Status 200.
```json
{
  "id": 1,
  "name": "Nome do Usuário",
  "courses": [
    { "id": 2553, "title": "Curso A", "progress": 45 }
  ]
}
```
