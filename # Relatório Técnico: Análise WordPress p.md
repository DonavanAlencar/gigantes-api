# Relatório Técnico: Análise WordPress para BFF Node.js
**Data:** 11 de Janeiro de 2026
**Sistema:** sistemagigantes.com
**Objetivo:** Análise técnica para implementação de BFF (Backend for Frontend) em Node.js
---
## 1. Conexão e Performance do Banco de Dados
### 1.1 Credenciais do Banco de Dados
**Arquivo:** `/home/sistemagigantes/public_html/wp-config.php`
```
DB_NAME: sistemagigantes_new_2
DB_USER: sistemagigantes_new_2
DB_PASSWORD: ukrbBAzfbyea2W%UP%9y24^Oy
DB_HOST: localhost
DB_CHARSET: utf8mb4
TABLE_PREFIX: wp_
```
**⚠️ RECOMENDAÇÃO CRÍTICA:** As credenciais do banco de dados estão hardcoded no `wp-config.php`. Para o BFF Node.js, implemente variáveis de ambiente e utilize um gerenciador de secrets (ex: AWS Secrets Manager, HashiCorp Vault).
### 1.2 Configurações de Cache e Performance
**Arquivo:** `/home/sistemagigantes/public_html/wp-performance-config.php`
#### Redis Object Cache (CONFIGURADO E ATIVO)
- **Host:** 127.0.0.1
- **Porta:** 6379
- **Database:** 0
- **Prefix:** `sistemagigantes:`
- **Status:** ✅ Redis está respondendo (PONG)
**Estatísticas Redis:**
- **Total de conexões:** 673,416
- **Total de comandos processados:** 112,856,556
- **Keys expiradas:** 472,506
- **Keyspace hits:** 86,850,644 (83.74% hit rate)
- **Keyspace misses:** 16,856,947
#### Configurações de Performance
- **WP_CACHE:** `true` (ativado)
- **WP_MEMORY_LIMIT:** `512M`
- **WP_MAX_MEMORY_LIMIT:** `512M`
- **WP_POST_REVISIONS:** 3
- **AUTOSAVE_INTERVAL:** 300 segundos (5 minutos)
- **EMPTY_TRASH_DAYS:** 7
- **WP_DEBUG:** `false` (produção)
- **SAVEQUERIES:** `false` (produção)
### 1.3 Estrutura do Banco de Dados
**Tabelas Principais:**
- **wp_postmeta:** 680,452 registros (58.7 MB de dados, 132 MB de índices)
- **wp_usermeta:** 116,531 registros (11.5 MB de dados, 24.6 MB de índices)
- **wp_comments:** 42,794 registros (11.5 MB de dados, 13.7 MB de índices)
- **wp_woocommerce_order_itemmeta:** 120,241 registros (8.5 MB de dados, 8.0 MB de índices)
- **wp_posts:** 16,798 registros (8.5 MB de dados, 5.3 MB de índices)
**Índices Críticos:**
- `wp_postmeta`: `post_id`, `meta_key`, `idx_meta_key_value`, `idx_meta_key_post_id`
- `wp_usermeta`: `user_id`, `meta_key`, `idx_user_meta`, `idx_user_meta_key`, `idx_meta_value_user`
---
## 2. Mapeamento de Regras de Negócio (WooCommerce + LearnDash)
### 2.1 Integração WooCommerce ↔ LearnDash
**Plugin Principal:** `learndash-woocommerce` (versão 2.0.2)
#### Relacionamento Produto → Curso
Os produtos WooCommerce estão relacionados aos cursos LearnDash através do metadado `_related_course` na tabela `wp_postmeta`:
```sql
-- Estrutura do relacionamento
meta_key: '_related_course'
meta_value: a:4:{i:0;i:2553;i:1;i:2327;i:2;i:2324;i:3;i:1836;}
-- Formato: Array serializado PHP com IDs dos cursos
```
**Metadados Identificados:**
- `_learndash_course_grid_*`: Configurações de grid de cursos (736 registros)
- `course_id`: Relacionamento direto com cursos (636 registros)
- `_sfwd-courses`: Taxonomia de cursos LearnDash (64 registros)
- `course_access_list`: Lista de usuários com acesso ao curso
### 2.2 Controle de Acesso via WooCommerce Subscriptions
**Plugin:** `subscriptions-for-woocommerce` (ativo)
**Status de Assinatura → Acesso ao Curso:**
O plugin LearnDash WooCommerce utiliza duas tabelas de configuração para mapear status de pedidos/assinaturas para acesso:
1. **Order Status Enrollment** (`learndash_woocommerce_settings`)
- Status de pedido WooCommerce → Acesso ao curso
- Arquivo: `/wp-content/plugins/learndash-woocommerce/src/admin-views/settings/sections/enrollment-status.php`
2. **Subscription Status Enrollment**
- Status de assinatura → Acesso ao curso
- Configurado através de `$prefix_subscription` + status
**Metadados de Assinatura:**
- `_subscription_price`: Preço da assinatura
- `_subscription_period`: Período (day, week, month, year)
- `_subscription_period_interval`: Intervalo do período
- `_subscription_length`: Duração total
- `_subscription_trial_length`: Período de teste
- `_subscription_limit`: Limite de renovações
**Configurações Identificadas:**
```
learndash_woocommerce_disable_access_removal_on_expiration: yes
// Acesso não é removido automaticamente na expiração
```
### 2.3 Fluxo de Enrolment
1. **Compra de Produto WooCommerce** → Order criado
2. **Status do Order** → Verificado contra `learndash_woocommerce_settings`
3. **Se status permitir** → Usuário inscrito no curso via `wp_learndash_user_activity`
4. **Se for assinatura** → Status da subscription também verificado
5. **Renovação/Expiração** → Gerenciado via hooks do WooCommerce Subscriptions
**⚠️ ATENÇÃO:** O plugin mantém uma fila silenciosa (`learndash_woocommerce_silent_course_enrollment_queue`) para processar enrolments retroativos.
---
## 3. Análise de Contrato de API REST
### 3.1 Status da REST API
**⚠️ PROBLEMA IDENTIFICADO:** A REST API do WordPress retorna **404 Not Found**
```bash
HTTP/1.1 404 Not Found
Cache-Control: no-cache, no-store, must-revalidate
```
**Possíveis Causas:**
1. Permalinks não configurados corretamente
2. .htaccess não processando rewrite rules para `/wp-json/*`
3. REST API desabilitada via filtro WordPress
4. Nginx bloqueando rotas `/wp-json/*`
**Verificação Necessária:**
- `permalink_structure` no `wp_options` (valor atual: não verificado)
- Testar: `wp rewrite flush` pode resolver
### 3.2 Configurações de REST API Identificadas
**LearnDash REST API:**
- **Status:** Habilitado (`learndash_settings_rest_api`)
- **Endpoints disponíveis:**
- `/wp-json/ldlms/v2/sfwd-courses` (cursos)
- `/wp-json/ldlms/v2/sfwd-lessons` (lições)
- `/wp-json/ldlms/v2/users` (usuários)
- `/wp-json/ldlms/v2/users-courses` (cursos por usuário)
- `/wp-json/ldlms/v2/users-course-progress_v2` (progresso do curso)
- E outros 30+ endpoints
**WooCommerce REST API:**
- **Status:** Desabilitado (`woocommerce_api_enabled: no`)
- **⚠️ RECOMENDAÇÃO:** Habilitar WooCommerce REST API para o BFF consumir dados de produtos/pedidos
### 3.3 Headers de Autorização
**Arquivo:** `/home/sistemagigantes/public_html/.htaccess`
✅ **CONFIGURADO CORRETAMENTE:**
```apache
# Preservar HTTP_AUTHORIZATION header
RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
```
O .htaccess está preservando o header `Authorization`, necessário para autenticação via Application Password ou OAuth.
### 3.4 Segurança de Headers
**Headers de Segurança Configurados:**
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
**Bloqueios de Segurança:**
- XMLRPC bloqueado (correto para segurança)
- Arquivos sensíveis protegidos (wp-config.php, .user.ini, etc.)
- Query strings maliciosas bloqueadas
---
## 4. Gargalos e Estratégia de Health Check
### 4.1 Gargalos Identificados
#### 4.1.1 Banco de Dados
**Tabela wp_postmeta (CRÍTICO):**
- **680,452 registros** sem índices compostos otimizados para queries complexas
- Queries que combinam `meta_key` + `meta_value` podem ser lentas
- Índice `idx_meta_key_value` existe mas pode precisar de otimização
**Recomendações:**
```sql
-- Considerar índices adicionais se queries específicas forem lentas
CREATE INDEX idx_postmeta_key_postid_value
ON wp_postmeta(meta_key, post_id, meta_value(100));
```
**Tabela wp_usermeta:**
- **116,531 registros** com índices adequados
- Índice `idx_meta_value_user` pode ajudar em buscas reversas
#### 4.1.2 Cache
**Redis (BOM):**
- Hit rate de 83.74% (excelente)
- 472K+ keys expiradas (indica uso ativo de TTL)
- Sem evictions (capacidade adequada)
**Pontos de Atenção:**
- Verificar TTL das chaves mais acessadas
- Monitorar uso de memória Redis
#### 4.1.3 Latência Potencial
1. **Queries de Meta Data:**
- Buscar todos os meta_keys de um post pode gerar múltiplas queries
- Considerar cache de metadados completos no Redis
2. **Queries de Relacionamento:**
- Produto → Cursos → Usuários pode gerar joins complexos
- Cache de relacionamentos recomendado
3. **Queries de Progresso:**
- `wp_learndash_user_activity` pode crescer significativamente
- Considerar índices adicionais se queries de progresso forem lentas
### 4.2 Estratégia de Health Check para Node.js
#### 4.2.1 Endpoint de Health Check WordPress
**Criar endpoint customizado:** `/wp-json/bff/v1/health`
```php
// Adicionar em functions.php do tema ou MU-plugin
add_action('rest_api_init', function () {
register_rest_route('bff/v1', '/health', [
'methods' => 'GET',
'callback' => 'bff_health_check',
'permission_callback' => '__return_true'
]);
});
function bff_health_check() {
global $wpdb;
$checks = [
'wordpress' => true,
'database' => false,
'redis' => false,
'timestamp' => current_time('mysql')
];
// Check database
$result = $wpdb->get_var("SELECT 1");
$checks['database'] = ($result === '1');
// Check Redis
if (class_exists('Redis') || function_exists('redis_connect')) {
// Implementar check Redis
$checks['redis'] = true; // Simplificado
}
return $checks;
}
```
#### 4.2.2 Health Check Node.js
**Implementação Recomendada:**
```javascript
// health-check.js
const axios = require('axios');
const redis = require('redis');
async function checkWordPressHealth() {
try {
const response = await axios.get('https://sistemagigantes.com/wp-json/bff/v1/health', {
timeout: 5000
});
return {
status: response.data.database && response.data.wordpress ? 'healthy' : 'degraded',
details: response.data
};
} catch (error) {
return { status: 'unhealthy', error: error.message };
}
}
async function checkDatabaseHealth() {
// Conectar diretamente ao MySQL/MariaDB
const mysql = require('mysql2/promise');
try {
const connection = await mysql.createConnection({
host: 'localhost',
user: 'sistemagigantes_new_2',
password: process.env.DB_PASSWORD,
database: 'sistemagigantes_new_2'
});
await connection.query('SELECT 1');
await connection.end();
return { status: 'healthy' };
} catch (error) {
return { status: 'unhealthy', error: error.message };
}
}
async function checkRedisHealth() {
const client = redis.createClient({ url: 'redis://127.0.0.1:6379' });
try {
await client.connect();
const pong = await client.ping();
await client.quit();
return { status: pong === 'PONG' ? 'healthy' : 'unhealthy' };
} catch (error) {
return { status: 'unhealthy', error: error.message };
}
}
async function comprehensiveHealthCheck() {
const [wp, db, redis] = await Promise.allSettled([
checkWordPressHealth(),
checkDatabaseHealth(),
checkRedisHealth()
]);
return {
wordpress: wp.status === 'fulfilled' ? wp.value : { status: 'unhealthy', error: wp.reason },
database: db.status === 'fulfilled' ? db.value : { status: 'unhealthy', error: db.reason },
redis: redis.status === 'fulfilled' ? redis.value : { status: 'unhealthy', error: redis.reason },
timestamp: new Date().toISOString()
};
}
```
**Intervalo Recomendado:** A cada 30 segundos
**Timeout:** 5 segundos por check
**Retry:** 3 tentativas com backoff exponencial
---
## 5. Segurança de Dados Sensíveis
### 5.1 Dados Sensíveis Identificados
#### 5.1.1 Credenciais
**⚠️ CRÍTICO:**
- Senhas do banco de dados no `wp-config.php`
- Chaves de autenticação WordPress (AUTH_KEY, SECURE_AUTH_KEY, etc.)
- Secrets de plugins (PayPal, Cielo, etc.) no `wp_options`
**Localização:**
- `/home/sistemagigantes/public_html/wp-config.php`
- Tabela `wp_options` (vários registros com `*_key`, `*_secret`, `*_token`)
#### 5.1.2 Logs
**Arquivos de Log Identificados:**
- `/wp-content/debug.log` (2.6 KB)
- `/wp-content/debug-restricao-membros.log`
- `/wp-content/uploads/wc-logs/*.log` (múltiplos arquivos)
- `/wp-content/uploads/wpdesk-logs/wpdesk_debug.log`
**Conteúdo Potencialmente Sensível:**
- Stack traces com caminhos de arquivos
- Dados de requisições HTTP
- Erros de autenticação
- Queries SQL (se WP_DEBUG_LOG ativado)
#### 5.1.3 Dados de Usuários
**Tabelas:**
- `wp_users`: Hashes de senhas (bcrypt)
- `wp_usermeta`: Metadados de usuários (podem conter dados sensíveis)
- `wp_learndash_user_activity`: Progresso e atividades dos usuários
### 5.2 Política de Sanitization para BFF Node.js
#### 5.2.1 Sanitização de Respostas
**Implementar Whitelist de Campos:**
```javascript
const ALLOWED_USER_FIELDS = [
'ID',
'user_login',
'user_email',
'display_name',
'user_registered'
];
const ALLOWED_POST_FIELDS = [
'ID',
'post_title',
'post_content',
'post_excerpt',
'post_date',
'post_status',
'post_type'
];
function sanitizeUser(user) {
const sanitized = {};
ALLOWED_USER_FIELDS.forEach(field => {
if (user[field] !== undefined) {
sanitized[field] = user[field];
}
});
// NUNCA incluir: user_pass, user_activation_key
return sanitized;
}
function sanitizePostMeta(meta) {
// Remover metadados sensíveis
const SENSITIVE_KEYS = [
/^_subscription/,
/^_payment/,
/^_private/,
/password/,
/secret/,
/token/,
/key$/i
];
return meta.filter(item => {
return !SENSITIVE_KEYS.some(pattern => pattern.test(item.meta_key));
});
}
```
#### 5.2.2 Sanitização de Logs
**NUNCA Logar:**
- Hashes de senhas
- Tokens de autenticação
- Chaves de API
- Dados de pagamento completos
- IPs de usuários (considerar LGPD)
**Implementar Redação:**
```javascript
function sanitizeForLogging(data) {
const sensitive = ['password', 'token', 'secret', 'key', 'authorization'];
const redacted = JSON.parse(JSON.stringify(data));
function redact(obj) {
for (let key in obj) {
if (typeof obj[key] === 'object' && obj[key] !== null) {
redact(obj[key]);
} else if (sensitive.some(s => key.toLowerCase().includes(s))) {
obj[key] = '[REDACTED]';
}
}
}
redact(redacted);
return redacted;
}
```
#### 5.2.3 Proteção de Endpoints
**Implementar Autenticação:**
- Application Passwords do WordPress
- JWT tokens (se implementar sistema customizado)
- OAuth 2.0 (para integração com frontend)
**Rate Limiting:**
- Implementar rate limiting por IP
- Considerar Cloudflare Rate Limiting (já configurado)
---
## 6. Recomendações Redis para BFF Node.js
### 6.1 Estratégia de Cache
#### 6.1.1 Chaves Recomendadas
**Padrão de Nomenclatura:**
```
sistemagigantes:bff:{namespace}:{identifier}:{variant}
```
**Namespaces Sugeridos:**
1. **Produtos:**
```
sistemagigantes:bff:product:{product_id}
sistemagigantes:bff:product:{product_id}:meta
sistemagigantes:bff:product:{product_id}:courses
```
- **TTL:** 3600 segundos (1 hora)
- **Invalidação:** On product update, order status change
2. **Cursos:**
```
sistemagigantes:bff:course:{course_id}
sistemagigantes:bff:course:{course_id}:meta
sistemagigantes:bff:course:{course_id}:users
```
- **TTL:** 3600 segundos (1 hora)
- **Invalidação:** On course update, enrollment change
3. **Usuários:**
```
sistemagigantes:bff:user:{user_id}
sistemagigantes:bff:user:{user_id}:courses
sistemagigantes:bff:user:{user_id}:progress
sistemagigantes:bff:user:{user_id}:subscriptions
```
- **TTL:** 1800 segundos (30 minutos)
- **Invalidação:** On user update, order status change, subscription renewal
4. **Pedidos:**
```
sistemagigantes:bff:order:{order_id}
sistemagigantes:bff:order:{order_id}:items
```
- **TTL:** 7200 segundos (2 horas)
- **Invalidação:** On order status change
5. **Relacionamentos:**
```
sistemagigantes:bff:relation:product:{product_id}:courses
sistemagigantes:bff:relation:course:{course_id}:products
```
- **TTL:** 86400 segundos (24 horas)
- **Invalidação:** On product/course relationship change
#### 6.1.2 TTLs por Tipo de Dado
| Tipo de Dado | TTL Recomendado | Justificativa |
|--------------|-----------------|---------------|
| Produtos | 1 hora | Mudanças infrequentes |
| Cursos | 1 hora | Mudanças infrequentes |
| Progresso do Usuário | 5 minutos | Dados mais dinâmicos |
| Metadados de Posts | 1 hora | Relativamente estático |
| Relacionamentos | 24 horas | Muito estático |
| Pedidos | 2 horas | Dados transacionais |
#### 6.1.3 Invalidação de Cache
**Estratégia de Invalidação via Webhooks WordPress:**
```php
// Adicionar hooks para invalidar cache no Redis
add_action('woocommerce_update_product', function($product_id) {
// Invalidar cache do produto
wp_cache_delete("sistemagigantes:bff:product:{$product_id}", 'bff');
wp_cache_delete("sistemagigantes:bff:product:{$product_id}:meta", 'bff');
wp_cache_delete("sistemagigantes:bff:product:{$product_id}:courses", 'bff');
});
add_action('woocommerce_order_status_changed', function($order_id, $old_status, $new_status) {
// Invalidar cache do pedido e do usuário
wp_cache_delete("sistemagigantes:bff:order:{$order_id}", 'bff');
// Invalidar cache de cursos do usuário
$order = wc_get_order($order_id);
if ($order) {
$user_id = $order->get_user_id();
wp_cache_delete("sistemagigantes:bff:user:{$user_id}:courses", 'bff');
wp_cache_delete("sistemagigantes:bff:user:{$user_id}:subscriptions", 'bff');
}
});
add_action('learndash_update_course_access', function($user_id, $course_id, $access_list) {
// Invalidar cache de cursos do usuário
wp_cache_delete("sistemagigantes:bff:user:{$user_id}:courses", 'bff');
wp_cache_delete("sistemagigantes:bff:course:{$course_id}:users", 'bff');
});
```
**Alternativa: Pub/Sub Redis:**
Se o BFF Node.js precisar de invalidação em tempo real, usar Redis Pub/Sub:
```javascript
// Node.js BFF
const subscriber = redis.createClient({ url: 'redis://127.0.0.1:6379' });
await subscriber.connect();
await subscriber.subscribe('bff:invalidate', (message) => {
const { key, pattern } = JSON.parse(message);
// Invalidar cache local ou remover do Redis
if (pattern) {
// Invalidar por padrão
invalidatePattern(pattern);
} else {
// Invalidar chave específica
cache.del(key);
}
});
```
### 6.2 Estrutura de Dados no Redis
**Serialização Recomendada:**
- **JSON** para objetos complexos
- **Strings simples** para valores únicos
- **Hashes** para objetos com múltiplos campos acessados individualmente
**Exemplo de Estrutura:**
```javascript
// Produto com relacionamentos
await redis.set(
'sistemagigantes:bff:product:496',
JSON.stringify({
id: 496,
name: 'Nome do Produto',
price: 99.90,
courses: [2553, 2327, 2324, 1836],
cached_at: Date.now()
}),
{ EX: 3600 }
);
// Progresso do usuário (mais dinâmico)
await redis.set(
'sistemagigantes:bff:user:123:progress:2553',
JSON.stringify({
course_id: 2553,
progress: 45,
last_activity: '2026-01-11T16:30:00Z',
completed: false
}),
{ EX: 300 } // 5 minutos
);
```
### 6.3 Monitoramento Redis
**Métricas a Monitorar:**
- Hit rate (atualmente 83.74% - excelente)
- Memória utilizada
- Número de keys
- Commands per second
- Evictions (atualmente 0 - bom sinal)
**Configuração Recomendada:**
- **maxmemory:** Configurar limite (ex: 2GB)
- **maxmemory-policy:** `allkeys-lru` (se memória limitada)
- **Monitoramento:** Redis INFO command ou ferramentas como RedisInsight
---
## 7. Endpoints Recomendados para BFF
### 7.1 Endpoints Críticos
#### 7.1.1 Produtos e Cursos
```
GET /api/products
GET /api/products/:id
GET /api/products/:id/courses
GET /api/courses
GET /api/courses/:id
GET /api/courses/:id/products
```
#### 7.1.2 Usuários e Progresso
```
GET /api/users/:id/courses
GET /api/users/:id/progress
GET /api/users/:id/subscriptions
GET /api/courses/:id/users
```
#### 7.1.3 Pedidos e Assinaturas
```
GET /api/orders/:id
GET /api/users/:id/orders
GET /api/subscriptions/:id
GET /api/users/:id/subscriptions
```
### 7.2 Autenticação
**Recomendação:** Implementar middleware de autenticação que valida tokens WordPress Application Passwords ou JWT customizado.
---
## 8. Resumo Executivo
### 8.1 Pontos Fortes
✅ Redis configurado e funcionando bem (83.74% hit rate)
✅ Índices de banco de dados adequados
✅ Headers de autorização preservados no .htaccess
✅ LearnDash REST API habilitada
✅ Configurações de performance otimizadas
### 8.2 Pontos de Atenção
⚠️ REST API WordPress retornando 404 (investigar)
⚠️ WooCommerce REST API desabilitado (habilitar para BFF)
⚠️ Credenciais hardcoded no wp-config.php
⚠️ Tabela wp_postmeta muito grande (680K+ registros)
⚠️ Múltiplos arquivos de log com potencial conteúdo sensível
### 8.3 Ações Recomendadas
1. **Imediato:**
- Habilitar WooCommerce REST API
- Investigar e corrigir 404 na REST API WordPress
- Implementar variáveis de ambiente para credenciais
2. **Curto Prazo:**
- Implementar endpoint de health check
- Configurar sanitização de dados no BFF
- Implementar estratégia de cache Redis conforme recomendações
3. **Médio Prazo:**
- Monitorar performance de queries no wp_postmeta
- Implementar invalidação de cache via webhooks
- Auditar e limpar logs sensíveis
---
**Relatório Gerado em:** 11 de Janeiro de 2026
**Próxima Revisão Recomendada:** Após implementação do BFF Node.js