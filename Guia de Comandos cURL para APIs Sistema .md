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