const Redis = require('ioredis');
const config = require('../config');

let redis;
const isMockMode = process.env.USE_MOCKS === 'true';

// Mock Redis client for mock mode
// Implements a minimal Redis interface that rate-limit and other plugins might need
const mockRedis = {
    get: async () => null,
    set: async () => 'OK',
    setex: async () => 'OK',
    del: async () => 1,
    exists: async () => 0,
    ping: async () => 'PONG',
    incr: async () => 1,
    expire: async () => 1,
    ttl: async () => -1,
    keys: async () => [],
    status: 'ready',
    // Prevent connection attempts
    connect: async () => {},
    disconnect: async () => {},
    quit: async () => {},
    // Event handlers (no-op)
    on: () => mockRedis,
    once: () => mockRedis,
    off: () => mockRedis,
    removeListener: () => mockRedis
};

const getClient = () => {
    // In mock mode, return a mock client that doesn't actually connect
    if (isMockMode) {
        return mockRedis;
    }

    if (!redis) {
        redis = new Redis(config.redis.url, {
            lazyConnect: true,
            retryStrategy: (times) => {
                // In mock mode, don't retry
                if (isMockMode) return null;
                return Math.min(times * 50, 2000);
            },
            maxRetriesPerRequest: isMockMode ? 0 : 3,
        });

        redis.on('error', (err) => {
            // Only log errors if not in mock mode or if it's a critical error
            if (!isMockMode || err.code !== 'ECONNREFUSED') {
                console.error('Redis Client Error:', err);
            }
        });
    }
    return redis;
};

const connect = async () => {
    // Skip connection in mock mode
    if (isMockMode) {
        return;
    }
    
    const client = getClient();
    if (client.status === 'wait') {
        try {
            await client.connect();
        } catch (err) {
            // Silently fail in mock mode
            if (!isMockMode) {
                throw err;
            }
        }
    }
};

const checkHealth = async () => {
    // In mock mode, always return true (cache is "available" but mocked)
    if (isMockMode) {
        return true;
    }
    
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
