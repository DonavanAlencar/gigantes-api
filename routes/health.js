const healthService = require('../services/health');

async function healthRoutes(fastify, options) {
    fastify.get('/api/health', async (request, reply) => {
        const result = await healthService.performHealthCheck();

        if (result.status === 'unhealthy') {
            reply.status(503);
        }

        return result;
    });
}

module.exports = healthRoutes;
