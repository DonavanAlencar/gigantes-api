Guia de Comandos cURL para APIs Sistema Gigantes
# 1. WordPress Health Check (Recomendado)
curl -X GET "https://sistemagigantes.com/wp-json/bff/v1/health"
# 2. WordPress REST API Index
curl -X GET "https://sistemagigantes.com/wp-json/wp/v2"
# 14. Listar Produtos
curl -X GET -u "ck_32e01b90b47f81a07968426daff7dfd41afa9d47:cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57" "https://sistemagigantes.com/wp-json/wc/v3/products?per_page=10&page=1"
# 15. Obter Produto por ID
curl -X GET -u "ck_32e01b90b47f81a07968426daff7dfd41afa9d47:cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57" "https://sistemagigantes.com/wp-json/wc/v3/products/496"
# 16. Listar Pedidos
curl -X GET -u "ck_32e01b90b47f81a07968426daff7dfd41afa9d47:cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57" "https://sistemagigantes.com/wp-json/wc/v3/orders?customer=1&per_page=10"
# 17. Obter Pedido por ID
curl -X GET -u "ck_32e01b90b47f81a07968426daff7dfd41afa9d47:cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57" "https://sistemagigantes.com/wp-json/wc/v3/orders/1"
# 18. Listar Assinaturas
curl -X GET -u "ck_32e01b90b47f81a07968426daff7dfd41afa9d47:cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57" "https://sistemagigantes.com/wp-json/wc/v3/subscriptions?customer=1"
# 19. Obter Assinatura por ID
curl -X GET -u "ck_32e01b90b47f81a07968426daff7dfd41afa9d47:cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57" "https://sistemagigantes.com/wp-json/wc/v3/subscriptions/1"
================================================================================
COMANDOS cURL - LearnDash REST API
================================================================================
# Credenciais LearnDash REST API (Application Password)
# Username: marcelo takashi.ishitani
# Application Password: sr1W5KqsCpPiQRk6mY0SvtgX
================================================================================
# 1. Listar Cursos
curl -X GET -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" "https://sistemagigantes.com/wp-json/ldlms/v2/sfwd-courses?per_page=10&page=1"
# 2. Obter Curso por ID
curl -X GET -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" "https://sistemagigantes.com/wp-json/ldlms/v2/sfwd-courses/2553"
# 3. Cursos do Usuário
curl -X GET -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" "https://sistemagigantes.com/wp-json/ldlms/v2/users-courses?user=1"
# 4. Progresso do Curso
curl -X GET -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" "https://sistemagigantes.com/wp-json/ldlms/v2/users-course-progress_v2?user=1&course=2553"
# 5. Usuários do Curso
curl -X GET -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" "https://sistemagigantes.com/wp-json/ldlms/v2/courses-users_v2?course=2553"
# 6. Listar Lições
curl -X GET -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" "https://sistemagigantes.com/wp-json/ldlms/v2/sfwd-lessons"
# 7. Obter Lição por ID
curl -X GET -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" "https://sistemagigantes.com/wp-json/ldlms/v2/sfwd-lessons/1"
# 8. Listar Usuários
curl -X GET -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" "https://sistemagigantes.com/wp-json/ldlms/v2/users"
# 9. Obter Usuário por ID
curl -X GET -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" "https://sistemagigantes.com/wp-json/ldlms/v2/users/1"
# 10. Listar Quizzes
curl -X GET -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" "https://sistemagigantes.com/wp-json/ldlms/v2/sfwd-quiz"
# 11. Estatísticas de Quiz
curl -X GET -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" "https://sistemagigantes.com/wp-json/ldlms/v2/quizzes-statistics_v2?quiz=1&user=1"
# Comandos cURL Completos - WordPress REST APIs
**Data:** 2026-01-11
**Sistema:** sistemagigantes.com
**Objetivo:** Lista completa de comandos cURL para todas as APIs REST disponíveis
---
## 🔐 Credenciais
### WooCommerce REST API
```
Consumer Key: ck_32e01b90b47f81a07968426daff7dfd41afa9d47
Consumer Secret: cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57
```
### LearnDash REST API
```
Username: marcelo takashi.ishitani
Application Password: sr1W5KqsCpPiQRk6mY0SvtgX
```
---
## 📊 WordPress Core REST API (wp/v2)
### Posts
#### GET - Listar Posts
```bash
curl -X GET "https://sistemagigantes.com/wp-json/wp/v2/posts?per_page=10&page=1"
```
#### GET - Obter Post por ID
```bash
curl -X GET "https://sistemagigantes.com/wp-json/wp/v2/posts/1"
```
#### POST - Criar Post
```bash
curl -X POST "https://sistemagigantes.com/wp-json/wp/v2/posts" \
-H "Content-Type: application/json" \
-d '{
"title": "Novo Post",
"content": "Conteúdo do post",
"status": "draft"
}'
```
#### PUT - Atualizar Post Completo
```bash
curl -X PUT "https://sistemagigantes.com/wp-json/wp/v2/posts/1" \
-H "Content-Type: application/json" \
-d '{
"title": "Post Atualizado",
"content": "Conteúdo atualizado",
"status": "publish"
}'
```
#### PATCH - Atualizar Post Parcial
```bash
curl -X PATCH "https://sistemagigantes.com/wp-json/wp/v2/posts/1" \
-H "Content-Type: application/json" \
-d '{
"title": "Título Atualizado"
}'
```
#### DELETE - Deletar Post
```bash
curl -X DELETE "https://sistemagigantes.com/wp-json/wp/v2/posts/1?force=true"
```
---
### Pages
#### GET - Listar Páginas
```bash
curl -X GET "https://sistemagigantes.com/wp-json/wp/v2/pages?per_page=10&page=1"
```
#### GET - Obter Página por ID
```bash
curl -X GET "https://sistemagigantes.com/wp-json/wp/v2/pages/1"
```
#### POST - Criar Página
```bash
curl -X POST "https://sistemagigantes.com/wp-json/wp/v2/pages" \
-H "Content-Type: application/json" \
-d '{
"title": "Nova Página",
"content": "Conteúdo da página",
"status": "draft"
}'
```
#### PUT - Atualizar Página Completa
```bash
curl -X PUT "https://sistemagigantes.com/wp-json/wp/v2/pages/1" \
-H "Content-Type: application/json" \
-d '{
"title": "Página Atualizada",
"content": "Conteúdo atualizado"
}'
```
#### PATCH - Atualizar Página Parcial
```bash
curl -X PATCH "https://sistemagigantes.com/wp-json/wp/v2/pages/1" \
-H "Content-Type: application/json" \
-d '{
"title": "Título Atualizado"
}'
```
#### DELETE - Deletar Página
```bash
curl -X DELETE "https://sistemagigantes.com/wp-json/wp/v2/pages/1?force=true"
```
---
### Users
#### GET - Listar Usuários
```bash
curl -X GET "https://sistemagigantes.com/wp-json/wp/v2/users?per_page=10&page=1"
```
#### GET - Obter Usuário por ID
```bash
curl -X GET "https://sistemagigantes.com/wp-json/wp/v2/users/1"
```
#### POST - Criar Usuário
```bash
curl -X POST "https://sistemagigantes.com/wp-json/wp/v2/users" \
-u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" \
-H "Content-Type: application/json" \
-d '{
"username": "novousuario",
"email": "novo@example.com",
"password": "senhaSegura123",
"roles": ["subscriber"]
}'
```
#### PUT - Atualizar Usuário Completo
```bash
curl -X PUT "https://sistemagigantes.com/wp-json/wp/v2/users/1" \
-u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" \
-H "Content-Type: application/json" \
-d '{
"email": "atualizado@example.com",
"roles": ["subscriber"]
}'
```
#### PATCH - Atualizar Usuário Parcial
```bash
curl -X PATCH "https://sistemagigantes.com/wp-json/wp/v2/users/1" \
-u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" \
-H "Content-Type: application/json" \
-d '{
"email": "atualizado@example.com"
}'
```
#### DELETE - Deletar Usuário
```bash
curl -X DELETE "https://sistemagigantes.com/wp-json/wp/v2/users/1?force=true&reassign=1" \
-u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX"
```
---
### Media
#### GET - Listar Mídia
```bash
curl -X GET "https://sistemagigantes.com/wp-json/wp/v2/media?per_page=10&page=1"
```
#### GET - Obter Mídia por ID
```bash
curl -X GET "https://sistemagigantes.com/wp-json/wp/v2/media/1"
```
#### POST - Upload de Mídia
```bash
curl -X POST "https://sistemagigantes.com/wp-json/wp/v2/media" \
-u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" \
-H "Content-Disposition: attachment; filename=imagem.jpg" \
-H "Content-Type: image/jpeg" \
--data-binary "@imagem.jpg"
```
#### PUT - Atualizar Mídia Completa
```bash
curl -X PUT "https://sistemagigantes.com/wp-json/wp/v2/media/1" \
-u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" \
-H "Content-Type: application/json" \
-d '{
"title": "Título Atualizado",
"caption": "Legenda atualizada"
}'
```
#### PATCH - Atualizar Mídia Parcial
```bash
curl -X PATCH "https://sistemagigantes.com/wp-json/wp/v2/media/1" \
-u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" \
-H "Content-Type: application/json" \
-d '{
"title": "Título Atualizado"
}'
```
#### DELETE - Deletar Mídia
```bash
curl -X DELETE "https://sistemagigantes.com/wp-json/wp/v2/media/1?force=true" \
-u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX"
```
---
### Comments
#### GET - Listar Comentários
```bash
curl -X GET "https://sistemagigantes.com/wp-json/wp/v2/comments?per_page=10&page=1"
```
#### GET - Obter Comentário por ID
```bash
curl -X GET "https://sistemagigantes.com/wp-json/wp/v2/comments/1"
```
#### POST - Criar Comentário
```bash
curl -X POST "https://sistemagigantes.com/wp-json/wp/v2/comments" \
-H "Content-Type: application/json" \
-d '{
"post": 1,
"content": "Comentário aqui",
"author_name": "Nome do Autor",
"author_email": "autor@example.com"
}'
```
#### PUT - Atualizar Comentário Completo
```bash
curl -X PUT "https://sistemagigantes.com/wp-json/wp/v2/comments/1" \
-u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" \
-H "Content-Type: application/json" \
-d '{
"content": "Comentário atualizado",
"status": "approved"
}'
```
#### PATCH - Atualizar Comentário Parcial
```bash
curl -X PATCH "https://sistemagigantes.com/wp-json/wp/v2/comments/1" \
-u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" \
-H "Content-Type: application/json" \
-d '{
"status": "approved"
}'
```
#### DELETE - Deletar Comentário
```bash
curl -X DELETE "https://sistemagigantes.com/wp-json/wp/v2/comments/1?force=true" \
-u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX"
```
---
## 🛒 WooCommerce REST API (wc/v3)
### Products
#### GET - Listar Produtos
```bash
curl -X GET -u "ck_32e01b90b47f81a07968426daff7dfd41afa9d47:cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57" \
"https://sistemagigantes.com/wp-json/wc/v3/products?per_page=10&page=1"
```
#### GET - Obter Produto por ID
```bash
curl -X GET -u "ck_32e01b90b47f81a07968426daff7dfd41afa9d47:cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57" \
"https://sistemagigantes.com/wp-json/wc/v3/products/1"
```
#### POST - Criar Produto
```bash
curl -X POST -u "ck_32e01b90b47f81a07968426daff7dfd41afa9d47:cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57" \
-H "Content-Type: application/json" \
-d '{
"name": "Produto Novo",
"type": "simple",
"regular_price": "29.99",
"description": "Descrição do produto",
"short_description": "Descrição curta",
"status": "publish"
}' \
"https://sistemagigantes.com/wp-json/wc/v3/products"
```
#### PUT - Atualizar Produto Completo
```bash
curl -X PUT -u "ck_32e01b90b47f81a07968426daff7dfd41afa9d47:cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57" \
-H "Content-Type: application/json" \
-d '{
"name": "Produto Atualizado",
"regular_price": "39.99",
"status": "publish"
}' \
"https://sistemagigantes.com/wp-json/wc/v3/products/1"
```
#### PATCH - Atualizar Produto Parcial
```bash
curl -X PATCH -u "ck_32e01b90b47f81a07968426daff7dfd41afa9d47:cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57" \
-H "Content-Type: application/json" \
-d '{
"regular_price": "49.99"
}' \
"https://sistemagigantes.com/wp-json/wc/v3/products/1"
```
#### DELETE - Deletar Produto
```bash
curl -X DELETE -u "ck_32e01b90b47f81a07968426daff7dfd41afa9d47:cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57" \
"https://sistemagigantes.com/wp-json/wc/v3/products/1?force=true"
```
---
### Orders
#### GET - Listar Pedidos
```bash
curl -X GET -u "ck_32e01b90b47f81a07968426daff7dfd41afa9d47:cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57" \
"https://sistemagigantes.com/wp-json/wc/v3/orders?per_page=10&page=1"
```
#### GET - Obter Pedido por ID
```bash
curl -X GET -u "ck_32e01b90b47f81a07968426daff7dfd41afa9d47:cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57" \
"https://sistemagigantes.com/wp-json/wc/v3/orders/1"
```
#### POST - Criar Pedido
```bash
curl -X POST -u "ck_32e01b90b47f81a07968426daff7dfd41afa9d47:cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57" \
-H "Content-Type: application/json" \
-d '{
"payment_method": "bacs",
"payment_method_title": "Transferência Bancária",
"set_paid": true,
"billing": {
"first_name": "João",
"last_name": "Silva",
"address_1": "Rua Exemplo, 123",
"city": "São Paulo",
"state": "SP",
"postcode": "01234-567",
"country": "BR",
"email": "joao@example.com",
"phone": "(11) 98765-4321"
},
"shipping": {
"first_name": "João",
"last_name": "Silva",
"address_1": "Rua Exemplo, 123",
"city": "São Paulo",
"state": "SP",
"postcode": "01234-567",
"country": "BR"
},
"line_items": [
{
"product_id": 1,
"quantity": 2
}
]
}' \
"https://sistemagigantes.com/wp-json/wc/v3/orders"
```
#### PUT - Atualizar Pedido Completo
```bash
curl -X PUT -u "ck_32e01b90b47f81a07968426daff7dfd41afa9d47:cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57" \
-H "Content-Type: application/json" \
-d '{
"status": "processing",
"billing": {
"first_name": "João",
"last_name": "Silva Atualizado",
"email": "joao@example.com"
}
}' \
"https://sistemagigantes.com/wp-json/wc/v3/orders/1"
```
#### PATCH - Atualizar Pedido Parcial
```bash
curl -X PATCH -u "ck_32e01b90b47f81a07968426daff7dfd41afa9d47:cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57" \
-H "Content-Type: application/json" \
-d '{
"status": "completed"
}' \
"https://sistemagigantes.com/wp-json/wc/v3/orders/1"
```
#### DELETE - Deletar Pedido
```bash
curl -X DELETE -u "ck_32e01b90b47f81a07968426daff7dfd41afa9d47:cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57" \
"https://sistemagigantes.com/wp-json/wc/v3/orders/1?force=true"
```
---
### Customers
#### GET - Listar Clientes
```bash
curl -X GET -u "ck_32e01b90b47f81a07968426daff7dfd41afa9d47:cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57" \
"https://sistemagigantes.com/wp-json/wc/v3/customers?per_page=10&page=1"
```
#### GET - Obter Cliente por ID
```bash
curl -X GET -u "ck_32e01b90b47f81a07968426daff7dfd41afa9d47:cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57" \
"https://sistemagigantes.com/wp-json/wc/v3/customers/1"
```
#### POST - Criar Cliente
```bash
curl -X POST -u "ck_32e01b90b47f81a07968426daff7dfd41afa9d47:cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57" \
-H "Content-Type: application/json" \
-d '{
"email": "novocliente@example.com",
"first_name": "Maria",
"last_name": "Santos",
"username": "mariasantos",
"password": "senhaSegura123",
"billing": {
"first_name": "Maria",
"last_name": "Santos",
"address_1": "Av. Exemplo, 456",
"city": "Rio de Janeiro",
"state": "RJ",
"postcode": "20000-000",
"country": "BR",
"email": "novocliente@example.com",
"phone": "(21) 98765-4321"
}
}' \
"https://sistemagigantes.com/wp-json/wc/v3/customers"
```
#### PUT - Atualizar Cliente Completo
```bash
curl -X PUT -u "ck_32e01b90b47f81a07968426daff7dfd41afa9d47:cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57" \
-H "Content-Type: application/json" \
-d '{
"first_name": "Maria",
"last_name": "Santos Atualizado",
"billing": {
"first_name": "Maria",
"last_name": "Santos Atualizado",
"email": "novocliente@example.com"
}
}' \
"https://sistemagigantes.com/wp-json/wc/v3/customers/1"
```
#### PATCH - Atualizar Cliente Parcial
```bash
curl -X PATCH -u "ck_32e01b90b47f81a07968426daff7dfd41afa9d47:cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57" \
-H "Content-Type: application/json" \
-d '{
"first_name": "Maria Atualizada"
}' \
"https://sistemagigantes.com/wp-json/wc/v3/customers/1"
```
#### DELETE - Deletar Cliente
```bash
curl -X DELETE -u "ck_32e01b90b47f81a07968426daff7dfd41afa9d47:cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57" \
"https://sistemagigantes.com/wp-json/wc/v3/customers/1?force=true"
```
---
### Coupons
#### GET - Listar Cupons
```bash
curl -X GET -u "ck_32e01b90b47f81a07968426daff7dfd41afa9d47:cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57" \
"https://sistemagigantes.com/wp-json/wc/v3/coupons?per_page=10&page=1"
```
#### GET - Obter Cupom por ID
```bash
curl -X GET -u "ck_32e01b90b47f81a07968426daff7dfd41afa9d47:cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57" \
"https://sistemagigantes.com/wp-json/wc/v3/coupons/1"
```
#### POST - Criar Cupom
```bash
curl -X POST -u "ck_32e01b90b47f81a07968426daff7dfd41afa9d47:cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57" \
-H "Content-Type: application/json" \
-d '{
"code": "DESCONTO10",
"discount_type": "percent",
"amount": "10.00",
"individual_use": true,
"exclude_sale_items": true,
"minimum_amount": "100.00"
}' \
"https://sistemagigantes.com/wp-json/wc/v3/coupons"
```
#### PUT - Atualizar Cupom Completo
```bash
curl -X PUT -u "ck_32e01b90b47f81a07968426daff7dfd41afa9d47:cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57" \
-H "Content-Type: application/json" \
-d '{
"code": "DESCONTO20",
"amount": "20.00",
"minimum_amount": "200.00"
}' \
"https://sistemagigantes.com/wp-json/wc/v3/coupons/1"
```
#### PATCH - Atualizar Cupom Parcial
```bash
curl -X PATCH -u "ck_32e01b90b47f81a07968426daff7dfd41afa9d47:cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57" \
-H "Content-Type: application/json" \
-d '{
"amount": "15.00"
}' \
"https://sistemagigantes.com/wp-json/wc/v3/coupons/1"
```
#### DELETE - Deletar Cupom
```bash
curl -X DELETE -u "ck_32e01b90b47f81a07968426daff7dfd41afa9d47:cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57" \
"https://sistemagigantes.com/wp-json/wc/v3/coupons/1?force=true"
```
---
### Product Categories
#### GET - Listar Categorias de Produtos
```bash
curl -X GET -u "ck_32e01b90b47f81a07968426daff7dfd41afa9d47:cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57" \
"https://sistemagigantes.com/wp-json/wc/v3/products/categories?per_page=10&page=1"
```
#### GET - Obter Categoria por ID
```bash
curl -X GET -u "ck_32e01b90b47f81a07968426daff7dfd41afa9d47:cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57" \
"https://sistemagigantes.com/wp-json/wc/v3/products/categories/1"
```
#### POST - Criar Categoria
```bash
curl -X POST -u "ck_32e01b90b47f81a07968426daff7dfd41afa9d47:cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57" \
-H "Content-Type: application/json" \
-d '{
"name": "Nova Categoria",
"slug": "nova-categoria"
}' \
"https://sistemagigantes.com/wp-json/wc/v3/products/categories"
```
#### PUT - Atualizar Categoria Completa
```bash
curl -X PUT -u "ck_32e01b90b47f81a07968426daff7dfd41afa9d47:cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57" \
-H "Content-Type: application/json" \
-d '{
"name": "Categoria Atualizada",
"slug": "categoria-atualizada"
}' \
"https://sistemagigantes.com/wp-json/wc/v3/products/categories/1"
```
#### PATCH - Atualizar Categoria Parcial
```bash
curl -X PATCH -u "ck_32e01b90b47f81a07968426daff7dfd41afa9d47:cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57" \
-H "Content-Type: application/json" \
-d '{
"name": "Nome Atualizado"
}' \
"https://sistemagigantes.com/wp-json/wc/v3/products/categories/1"
```
#### DELETE - Deletar Categoria
```bash
curl -X DELETE -u "ck_32e01b90b47f81a07968426daff7dfd41afa9d47:cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57" \
"https://sistemagigantes.com/wp-json/wc/v3/products/categories/1?force=true"
```
---
### Reports
#### GET - Relatório de Vendas
```bash
curl -X GET -u "ck_32e01b90b47f81a07968426daff7dfd41afa9d47:cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57" \
"https://sistemagigantes.com/wp-json/wc/v3/reports/sales"
```
#### GET - Relatório de Produtos Mais Vendidos
```bash
curl -X GET -u "ck_32e01b90b47f81a07968426daff7dfd41afa9d47:cs_74d374e54c46a079bc15305d1ccd9ceb162f9a57" \
"https://sistemagigantes.com/wp-json/wc/v3/reports/top_sellers"
```
---
## 📚 LearnDash REST API (ldlms/v2)
### Courses
#### GET - Listar Cursos
```bash
curl -X GET -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" \
"https://sistemagigantes.com/wp-json/ldlms/v2/sfwd-courses?per_page=10&page=1"
```
#### GET - Obter Curso por ID
```bash
curl -X GET -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" \
"https://sistemagigantes.com/wp-json/ldlms/v2/sfwd-courses/2553"
```
#### POST - Criar Curso
```bash
curl -X POST -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" \
-H "Content-Type: application/json" \
-d '{
"title": "Novo Curso",
"content": "Descrição do curso",
"status": "publish",
"course_price_type": "free"
}' \
"https://sistemagigantes.com/wp-json/ldlms/v2/sfwd-courses"
```
#### PUT - Atualizar Curso Completo
```bash
curl -X PUT -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" \
-H "Content-Type: application/json" \
-d '{
"title": "Curso Atualizado",
"content": "Descrição atualizada",
"status": "publish"
}' \
"https://sistemagigantes.com/wp-json/ldlms/v2/sfwd-courses/2553"
```
#### PATCH - Atualizar Curso Parcial
```bash
curl -X PATCH -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" \
-H "Content-Type: application/json" \
-d '{
"title": "Título Atualizado"
}' \
"https://sistemagigantes.com/wp-json/ldlms/v2/sfwd-courses/2553"
```
#### DELETE - Deletar Curso
```bash
curl -X DELETE -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" \
"https://sistemagigantes.com/wp-json/ldlms/v2/sfwd-courses/2553?force=true"
```
---
### Lessons
#### GET - Listar Lições
```bash
curl -X GET -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" \
"https://sistemagigantes.com/wp-json/ldlms/v2/sfwd-lessons?per_page=10&page=1"
```
#### GET - Obter Lição por ID
```bash
curl -X GET -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" \
"https://sistemagigantes.com/wp-json/ldlms/v2/sfwd-lessons/1"
```
#### POST - Criar Lição
```bash
curl -X POST -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" \
-H "Content-Type: application/json" \
-d '{
"title": "Nova Lição",
"content": "Conteúdo da lição",
"status": "publish",
"course": 2553
}' \
"https://sistemagigantes.com/wp-json/ldlms/v2/sfwd-lessons"
```
#### PUT - Atualizar Lição Completa
```bash
curl -X PUT -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" \
-H "Content-Type: application/json" \
-d '{
"title": "Lição Atualizada",
"content": "Conteúdo atualizado",
"status": "publish"
}' \
"https://sistemagigantes.com/wp-json/ldlms/v2/sfwd-lessons/1"
```
#### PATCH - Atualizar Lição Parcial
```bash
curl -X PATCH -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" \
-H "Content-Type: application/json" \
-d '{
"title": "Título Atualizado"
}' \
"https://sistemagigantes.com/wp-json/ldlms/v2/sfwd-lessons/1"
```
#### DELETE - Deletar Lição
```bash
curl -X DELETE -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" \
"https://sistemagigantes.com/wp-json/ldlms/v2/sfwd-lessons/1?force=true"
```
---
### Quizzes
#### GET - Listar Quizzes
```bash
curl -X GET -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" \
"https://sistemagigantes.com/wp-json/ldlms/v2/sfwd-quiz?per_page=10&page=1"
```
#### GET - Obter Quiz por ID
```bash
curl -X GET -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" \
"https://sistemagigantes.com/wp-json/ldlms/v2/sfwd-quiz/1"
```
#### POST - Criar Quiz
```bash
curl -X POST -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" \
-H "Content-Type: application/json" \
-d '{
"title": "Novo Quiz",
"content": "Descrição do quiz",
"status": "publish"
}' \
"https://sistemagigantes.com/wp-json/ldlms/v2/sfwd-quiz"
```
#### PUT - Atualizar Quiz Completo
```bash
curl -X PUT -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" \
-H "Content-Type: application/json" \
-d '{
"title": "Quiz Atualizado",
"content": "Descrição atualizada",
"status": "publish"
}' \
"https://sistemagigantes.com/wp-json/ldlms/v2/sfwd-quiz/1"
```
#### PATCH - Atualizar Quiz Parcial
```bash
curl -X PATCH -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" \
-H "Content-Type: application/json" \
-d '{
"title": "Título Atualizado"
}' \
"https://sistemagigantes.com/wp-json/ldlms/v2/sfwd-quiz/1"
```
#### DELETE - Deletar Quiz
```bash
curl -X DELETE -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" \
"https://sistemagigantes.com/wp-json/ldlms/v2/sfwd-quiz/1?force=true"
```
---
### Users
#### GET - Listar Usuários
```bash
curl -X GET -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" \
"https://sistemagigantes.com/wp-json/ldlms/v2/users?per_page=10&page=1"
```
#### GET - Obter Usuário por ID
```bash
curl -X GET -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" \
"https://sistemagigantes.com/wp-json/ldlms/v2/users/1"
```
#### POST - Criar Usuário
```bash
curl -X POST -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" \
-H "Content-Type: application/json" \
-d '{
"username": "novousuario",
"email": "novo@example.com",
"password": "senhaSegura123",
"roles": ["subscriber"]
}' \
"https://sistemagigantes.com/wp-json/ldlms/v2/users"
```
#### PUT - Atualizar Usuário Completo
```bash
curl -X PUT -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" \
-H "Content-Type: application/json" \
-d '{
"email": "atualizado@example.com",
"first_name": "Nome",
"last_name": "Sobrenome"
}' \
"https://sistemagigantes.com/wp-json/ldlms/v2/users/1"
```
#### PATCH - Atualizar Usuário Parcial
```bash
curl -X PATCH -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" \
-H "Content-Type: application/json" \
-d '{
"email": "atualizado@example.com"
}' \
"https://sistemagigantes.com/wp-json/ldlms/v2/users/1"
```
#### DELETE - Deletar Usuário
```bash
curl -X DELETE -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" \
"https://sistemagigantes.com/wp-json/ldlms/v2/users/1?force=true"
```
---
### Users Courses (Somente Leitura)
#### GET - Cursos do Usuário
```bash
curl -X GET -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" \
"https://sistemagigantes.com/wp-json/ldlms/v2/users-courses?user=1"
```
#### GET - Progresso do Curso
```bash
curl -X GET -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" \
"https://sistemagigantes.com/wp-json/ldlms/v2/users-course-progress_v2?user=1&course=2553"
```
#### GET - Usuários do Curso
```bash
curl -X GET -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" \
"https://sistemagigantes.com/wp-json/ldlms/v2/courses-users_v2?course=2553"
```
#### GET - Estatísticas de Quiz
```bash
curl -X GET -u "marcelo takashi.ishitani:sr1W5KqsCpPiQRk6mY0SvtgX" \
"https://sistemagigantes.com/wp-json/ldlms/v2/quizzes-statistics_v2?quiz=1&user=1"
```
---
## 📝 Notas Importantes
### Autenticação
1. **WooCommerce**: Usa Basic Authentication com Consumer Key e Consumer Secret
- Formato: `-u "CONSUMER_KEY:CONSUMER_SECRET"`
2. **LearnDash**: Usa Basic Authentication com Username e Application Password
- Formato: `-u "USERNAME:APPLICATION_PASSWORD"`
- **IMPORTANTE**: O username pode conter espaços, use aspas!
3. **WordPress Core**:
- Endpoints públicos (GET) geralmente não requerem autenticação
- Endpoints de escrita (POST/PUT/PATCH/DELETE) requerem autenticação
- Pode usar Application Passwords ou OAuth
### Parâmetros Comuns
- `per_page`: Número de itens por página (padrão: 10)
- `page`: Número da página (padrão: 1)
- `force=true`: Para DELETE, força a exclusão permanente (sem enviar para lixeira)
### IDs de Exemplo
Os IDs usados nos exemplos (como `/products/1`, `/courses/2553`) são apenas exemplos. Substitua pelos IDs reais do seu sistema.
### Testes
Recomenda-se testar primeiro com GET antes de executar operações de escrita (POST/PUT/PATCH/DELETE).
---
**Documento gerado em:** 2026-01-11
**Credenciais atualizadas:** 2026-01-11