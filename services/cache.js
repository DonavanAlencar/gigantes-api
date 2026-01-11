const Redis = require('ioredis');
const config = require('../config');

let redis;

const getClient = () => {
    if (!redis) {
        redis = new Redis(config.redis.url, {
            lazyConnect: true,
            retryStrategy: (times) => Math.min(times * 50, 2000),
        });

        redis.on('error', (err) => {
            console.error('Redis Client Error:', err);
        });
    }
    return redis;
};

const connect = async () => {
    const client = getClient();
    if (client.status === 'wait') {
        await client.connect();
    }
};

const checkHealth = async () => {
    try {
        const client = getClient();
        const res = await client.ping();
        return res === 'PONG';
    } catch (err) {
        console.error('Redis Health Check Failed:', err.message);
        return false;
    }
}

module.exports = {
    getClient,
    connect,
    checkHealth
};
