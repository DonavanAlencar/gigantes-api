const crud = require('../services/crud');

// Helper to register generic CRUD routes for a resource
const registerCrudRoutes = (fastify, namespace, resource, prefix) => {
    // List
    fastify.get(`${prefix}`, {
        schema: {
            tags: ['WordPress Core'],
            description: `List ${resource}`,
            querystring: {
                type: 'object',
                properties: {
                    page: { type: 'integer', default: 1 },
                    per_page: { type: 'integer', default: 10 }
                }
            }
        }
    }, async (request, reply) => {
        return crud.list(namespace, resource, request.query);
    });

    // Get
    fastify.get(`${prefix}/:id`, {
        schema: {
            tags: ['WordPress Core'],
            description: `Get ${resource} by ID`,
            params: {
                type: 'object',
                properties: {
                    id: { type: 'integer' }
                }
            }
        }
    }, async (request, reply) => {
        return crud.get(namespace, resource, request.params.id, request.query);
    });

    // Create
    fastify.post(`${prefix}`, {
        schema: {
            tags: ['WordPress Core'],
            description: `Create ${resource}`,
            body: { type: 'object' }
        }
    }, async (request, reply) => {
        return crud.create(namespace, resource, request.body);
    });

    // Update (PUT)
    fastify.put(`${prefix}/:id`, {
        schema: {
            tags: ['WordPress Core'],
            description: `Update ${resource} (Full)`,
            params: {
                type: 'object',
                properties: {
                    id: { type: 'integer' }
                }
            },
            body: { type: 'object' }
        }
    }, async (request, reply) => {
        return crud.update(namespace, resource, request.params.id, request.body);
    });

    // Patch
    fastify.patch(`${prefix}/:id`, {
        schema: {
            tags: ['WordPress Core'],
            description: `Update ${resource} (Partial)`,
            params: {
                type: 'object',
                properties: {
                    id: { type: 'integer' }
                }
            },
            body: { type: 'object' }
        }
    }, async (request, reply) => {
        // Fastify uses 'PATCH' method logic
        return crud.patch(namespace, resource, request.params.id, request.body);
    });

    // Delete
    fastify.delete(`${prefix}/:id`, {
        schema: {
            tags: ['WordPress Core'],
            description: `Delete ${resource}`,
            params: {
                type: 'object',
                properties: {
                    id: { type: 'integer' }
                }
            },
            querystring: {
                type: 'object',
                properties: {
                    force: { type: 'boolean', default: false }
                }
            }
        }
    }, async (request, reply) => {
        return crud.remove(namespace, resource, request.params.id, request.query);
    });
};

async function wpCoreRoutes(fastify, options) {
    const namespace = 'wp/v2';

    registerCrudRoutes(fastify, namespace, 'posts', '/api/wp/posts');
    registerCrudRoutes(fastify, namespace, 'pages', '/api/wp/pages');
    registerCrudRoutes(fastify, namespace, 'users', '/api/wp/users');
    registerCrudRoutes(fastify, namespace, 'media', '/api/wp/media');
    registerCrudRoutes(fastify, namespace, 'comments', '/api/wp/comments');
}

module.exports = wpCoreRoutes;
