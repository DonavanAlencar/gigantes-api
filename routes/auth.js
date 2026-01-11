const axios = require('axios');
const config = require('../config');

// We use a separate Axios instance or simple axios call to VALIDATE creds
// because generic wpClient might use system creds. 
// Here we want to test USER provided creds.

async function authRoutes(fastify, options) {
    fastify.post('/api/auth/login', {
        schema: {
            tags: ['Auth'],
            description: 'Login to get JWT Token',
            body: {
                type: 'object',
                required: ['username', 'password'],
                properties: {
                    username: { type: 'string' },
                    password: { type: 'string' }
                }
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        token: { type: 'string' },
                        user: {
                            type: 'object',
                            properties: {
                                id: { type: 'integer' },
                                name: { type: 'string' },
                                roles: { type: 'array', items: { type: 'string' } }
                            }
                        }
                    }
                }
            }
        }
    }, async (request, reply) => {
        const { username, password } = request.body;

        try {
            // Attempt to fetch current user ("me") using provided credentials
            const validationRes = await axios.get(`${config.wordpress.url}/wp/v2/users/me`, {
                auth: {
                    username: username,
                    password: password
                },
                timeout: 5000
            });

            const user = validationRes.data;

            // Generate JWT
            const token = fastify.jwt.sign({
                id: user.id,
                username: user.slug,
                roles: user.roles
            });

            return {
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    roles: user.roles
                }
            };

        } catch (error) {
            if (error.response && error.response.status === 401) {
                reply.code(401).send({ error: 'Invalid credentials' });
            } else {
                request.log.error(error); // Log internal error
                reply.code(500).send({ error: 'Authentication failed' });
            }
        }
    });
}

module.exports = authRoutes;
