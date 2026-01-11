const fastify = require('fastify');
const config = require('./config');
const securityMiddleware = require('./middlewares/security');
const cache = require('./services/cache');

const startServer = async () => {
    const server = fastify({
        logger: {
            level: config.logLevel,
            transport: {
                target: 'pino-pretty',
                options: {
                    translateTime: 'HH:MM:ss Z',
                    ignore: 'pid,hostname',
                },
            },
        }
    });

    // Register Rate Limit
    await server.register(require('@fastify/rate-limit'), {
        global: false, // We'll apply it manually or specifically if needed, or global: 'true' with defaults
        max: 100,
        timeWindow: '1 minute',
        redis: cache.getClient(), // Use our Redis instance
    });

    // Register Security Middleware
    await server.register(securityMiddleware);

    // Register Routes
    server.register(require('./routes/health'));
    server.register(require('./routes/products'));
    server.register(require('./routes/users'));

    // Global Error Handler
    server.setErrorHandler(function (error, request, reply) {
        if (error.validation) {
            reply.status(400).send({ error: 'Validation Error', message: error.message });
        } else {
            request.log.error(error);
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });

    try {
        await server.listen({ port: config.port, host: '0.0.0.0' });
        console.log(`Server listening on ${server.server.address().port}`);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

startServer();
