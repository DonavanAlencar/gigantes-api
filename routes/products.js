const productService = require('../services/product');

async function productRoutes(fastify, options) {
    fastify.get('/api/products/:id', async (request, reply) => {
        const { id } = request.params;
        try {
            const product = await productService.getProduct(id);
            return product;
        } catch (error) {
            if (error.message === 'Product not found') {
                reply.status(404).send({ error: 'Product not found' });
            } else {
                request.log.error(error);
                reply.status(500).send({ error: 'Internal Server Error' });
            }
        }
    });
}

module.exports = productRoutes;
