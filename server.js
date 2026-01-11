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

    // Register JWT
    await server.register(require('@fastify/jwt'), {
        secret: process.env.JWT_SECRET || 'supersecretsharedkeyrequireschangelater'
    });

    // Register Auth Decorator
    await server.register(require('./middlewares/auth'));

    // Register Swagger
    await server.register(require('@fastify/swagger'), {
        swagger: {
            info: {
                title: 'Sistema Gigantes BFF',
                description: 'BFF Documentation',
                version: '1.0.0'
            },
            host: 'localhost:3000',
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json'],
            securityDefinitions: {
                Bearer: {
                    type: 'apiKey',
                    name: 'Authorization',
                    in: 'header'
                }
            },
            security: [{ Bearer: [] }]
        }
    });

    await server.register(require('@fastify/swagger-ui'), {
        routePrefix: '/documentation',
        uiConfig: {
            docExpansion: 'none',
            deepLinking: false
        },
        staticCSP: true,
        transformStaticCSP: (header) => header
    });

    // Authenticated Routes (Global Guard Logic)
    server.addHook('preHandler', async (request, reply) => {
        // Exclude Public Paths
        const publicPaths = ['/api/auth/login', '/api/health', '/documentation', '/documentation/'];

        // Debug logging
        request.log.info({ routerPath: request.routerPath, url: request.url }, 'Checking Auth Guard');

        // Simple check: if path starts with /documentation or is in publicPaths
        const urlPath = request.raw.url.split('?')[0]; // Safe URL path without query

        if (publicPaths.includes(request.routerPath) || publicPaths.includes(urlPath) || request.url.startsWith('/documentation') || request.url.startsWith('/static')) {
            return;
        }

        // Check JWT
        try {
            await request.jwtVerify();
        } catch (err) {
            reply.send(err);
        }
    });

    // Register Routes
    // Public Routes
    server.register(require('./routes/auth'));
    server.register(require('./routes/health'));

    server.register(require('./routes/products'));
    server.register(require('./routes/users'));
    server.register(require('./routes/wp-core'));
    server.register(require('./routes/wc-store'));
    server.register(require('./routes/ld-lms'));

    // Global Error Handler
    server.setErrorHandler(function (error, request, reply) {
        request.log.error(error); // Log everything for debugging

        if (error.validation) {
            reply.status(400).send({ error: 'Validation Error', message: error.message });
        } else if (error.statusCode) {
            // Pass through the status code from the error (e.g. 401, 404)
            reply.status(error.statusCode).send({ error: error.message || 'Error', code: error.code });
        } else {
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
