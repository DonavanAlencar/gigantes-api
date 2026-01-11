const crud = require('../services/crud');

const registerCrudRoutes = (fastify, namespace, resource, prefix) => {
    // List
    fastify.get(`${prefix}`, {
        schema: {
            tags: ['LearnDash'],
            description: `List ${resource}`
        }
    }, async (request, reply) => {
        return crud.list(namespace, resource, request.query);
    });

    // Get
    fastify.get(`${prefix}/:id`, {
        schema: {
            tags: ['LearnDash'],
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
            tags: ['LearnDash'],
            description: `Create ${resource}`
        }
    }, async (request, reply) => {
        return crud.create(namespace, resource, request.body);
    });

    // Update
    fastify.put(`${prefix}/:id`, {
        schema: {
            tags: ['LearnDash'],
            description: `Update ${resource}`,
            params: {
                type: 'object',
                properties: {
                    id: { type: 'integer' }
                }
            }
        }
    }, async (request, reply) => {
        return crud.update(namespace, resource, request.params.id, request.body);
    });

    // Patch
    fastify.patch(`${prefix}/:id`, {
        schema: {
            tags: ['LearnDash'],
            description: `Update ${resource} (Partial)`,
            params: {
                type: 'object',
                properties: {
                    id: { type: 'integer' }
                }
            }
        }
    }, async (request, reply) => {
        return crud.patch(namespace, resource, request.params.id, request.body);
    });

    // Delete
    fastify.delete(`${prefix}/:id`, {
        schema: {
            tags: ['LearnDash'],
            description: `Delete ${resource}`,
            params: {
                type: 'object',
                properties: {
                    id: { type: 'integer' }
                }
            }
        }
    }, async (request, reply) => {
        return crud.remove(namespace, resource, request.params.id, request.query);
    });
};

async function ldLmsRoutes(fastify, options) {
    const namespace = 'ldlms/v2';

    registerCrudRoutes(fastify, namespace, 'sfwd-courses', '/api/ld/courses');
    registerCrudRoutes(fastify, namespace, 'sfwd-lessons', '/api/ld/lessons');
    registerCrudRoutes(fastify, namespace, 'sfwd-quiz', '/api/ld/quizzes');
    registerCrudRoutes(fastify, namespace, 'users', '/api/ld/users');

    // Read-only / Custom nested routes
    fastify.get('/api/ld/users/courses', {
        schema: { tags: ['LearnDash'], description: 'Get User Courses' }
    }, async (request) => crud.list(namespace, 'users-courses', request.query));

    fastify.get('/api/ld/users/progress', {
        schema: { tags: ['LearnDash'], description: 'Get User Progress' }
    }, async (request) => crud.list(namespace, 'users-course-progress_v2', request.query));

    fastify.get('/api/ld/courses/users', {
        schema: { tags: ['LearnDash'], description: 'Get Course Users' }
    }, async (request) => crud.list(namespace, 'courses-users_v2', request.query));
}

module.exports = ldLmsRoutes;
