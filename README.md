# Sistema Gigantes BFF

API Gateway / Backend-for-Frontend (BFF) para o Sistema Gigantes. Centraliza a comunicação com WordPress, WooCommerce e LearnDash.

## 🚀 Como Rodar

### Pré-requisitos
*   Node.js 18+
*   Redis (opcional em dev, obrigatório em prod)

### Instalação
```bash
npm install
```

### Modos de Execução

#### 1. Modo Mock (Desenvolvimento Offline) 🧪
Utiliza arquivos JSON locais em `mocks/` para simular as APIs externas. Não requer conexão com o WordPress.
```bash
npm run dev:mock
```

#### 2. Modo Desenvolvimento (API Real) 🌍
Conecta nas APIs reais configuradas no `.env`.
```bash
npm run dev
```

#### 3. Produção
```bash
npm start
```

## 🧪 Testes

O projeto utiliza **Jest** para testes unitários e de integração com a camada de serviços.
Foi criado um script otimizado para rodar a suíte completa rapidamente:

```bash
chmod +x run-tests.sh
./run-tests.sh
```

### Cobertura de Mocks
Os testes validam automaticamente os seguintes serviços mockados:
*   **WordPress Core**: Posts, Pages, Users, Media, Comments.
*   **WooCommerce**: Products, Orders, Customers, Coupons, Categories, Reports.
*   **LearnDash**: Courses, Lessons, Quizzes, User Progress.

## 📁 Estrutura do Projeto

*   `routes/`: Definição das rotas Fastify e documentação Swagger.
*   `services/`:
    *   `crud.js`: Serviço genérico que consome as APIs.
    *   `product.js`: Lógica de negócio específica para produtos.
    *   `user.js`: Lógica de agregação de dashboard de aluno.
    *   `http.js`: Cliente HTTP (Axios) com Adapter para Mocks.
*   `mocks/`: Arquivos JSON organizados por `namespace/resource`.

## 📚 Documentação da API (Swagger)

Com o servidor rodando, acesse:
[http://localhost:3000/documentation](http://localhost:3000/documentation)
