const userService = require('../services/user');

async function userRoutes(fastify, options) {
    fastify.get('/api/users/:id/dashboard', async (request, reply) => {
        const { id } = request.params;
        try {
            const dashboard = await userService.getUserDashboard(id);
            return dashboard;
        } catch (error) {
            if (error.message === 'User not found') {
                reply.status(404).send({ error: 'User not found' });
            } else {
                request.log.error(error);
                reply.status(500).send({ error: 'Internal Server Error' });
            }
        }
    });
}

module.exports = userRoutes;
