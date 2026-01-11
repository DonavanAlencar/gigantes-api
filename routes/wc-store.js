const crud = require('../services/crud');

const registerCrudRoutes = (fastify, namespace, resource, prefix) => {
    // List
    fastify.get(`${prefix}`, {
        schema: {
            tags: ['WooCommerce'],
            description: `List ${resource}`
        }
    }, async (request, reply) => {
        return crud.list(namespace, resource, request.query);
    });

    // Get
    fastify.get(`${prefix}/:id`, {
        schema: {
            tags: ['WooCommerce'],
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
            tags: ['WooCommerce'],
            description: `Create ${resource}`
        }
    }, async (request, reply) => {
        return crud.create(namespace, resource, request.body);
    });

    // Update
    fastify.put(`${prefix}/:id`, {
        schema: {
            tags: ['WooCommerce'],
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

    // Update (Partial) - WC uses Put too but Patch is supported
    fastify.patch(`${prefix}/:id`, {
        schema: {
            tags: ['WooCommerce'],
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
            tags: ['WooCommerce'],
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

async function wcStoreRoutes(fastify, options) {
    const namespace = 'wc/v3';

    // Note: 'products/categories' resource name is tricky in generic CRUD because of '/'
    // We can handle it by passing resource as 'products/categories'

    registerCrudRoutes(fastify, namespace, 'products', '/api/wc/products');
    registerCrudRoutes(fastify, namespace, 'orders', '/api/wc/orders');
    registerCrudRoutes(fastify, namespace, 'customers', '/api/wc/customers');
    registerCrudRoutes(fastify, namespace, 'coupons', '/api/wc/coupons');

    // Nested resources
    registerCrudRoutes(fastify, namespace, 'products/categories', '/api/wc/categories');
    registerCrudRoutes(fastify, namespace, 'reports/sales', '/api/wc/reports/sales');
    registerCrudRoutes(fastify, namespace, 'reports/top_sellers', '/api/wc/reports/top_sellers');
}

module.exports = wcStoreRoutes;
