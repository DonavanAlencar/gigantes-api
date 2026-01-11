const fp = require('fastify-plugin');

// Redaction rules for logging
const SENSITIVE_KEYS = ['password', 'token', 'secret', 'key', 'authorization'];

const redact = (obj) => {
    if (typeof obj !== 'object' || obj === null) return obj;
    if (Array.isArray(obj)) return obj.map(redact);

    const newObj = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            if (SENSITIVE_KEYS.some(s => key.toLowerCase().includes(s))) {
                newObj[key] = '[REDACTED]';
            } else {
                newObj[key] = redact(obj[key]);
            }
        }
    }
    return newObj;
};

module.exports = fp(async (fastify, opts) => {
    // Register pino-native logging hooks if not already handled by fastify default logger
    // Fastify's default logger can be configured with serializers, but here we add a global hook 
    // to ensure manual log calls are also safe, or rely on fastify's built-in redaction.
    // Ideally, fastify configuration in server.js should handle redaction, 
    // but we can add a preSerialization hook to double check responses.

    fastify.addHook('preSerialization', async (request, reply, payload) => {
        return redact(payload);
    });

    // Example Auth Middleware (Placeholder)
    fastify.decorate('authenticate', async (request, reply) => {
        // Implement authentication logic here (e.g. JWT check)
        // For now, allow everything or basic check
        // request.user = ...
    });
});
