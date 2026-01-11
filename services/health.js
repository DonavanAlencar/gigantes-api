const db = require('./db');
const cache = require('./cache');
const { wpClient, getWcAuthHeader } = require('./http');

const performHealthCheck = async () => {
    const checks = {
        wordpress: false,
        database: false,
        redis: false,
        timestamp: new Date().toISOString()
    };

    // Check MySQL
    checks.database = await db.checkHealth();

    // Check Redis
    checks.redis = await cache.checkHealth();

    // Check WordPress (HTTP)
    try {
        // Using a lightweight endpoint, or just checking connectivity
        // Trying to hit the main WP REST API index
        await wpClient.get('/', {
            // Low timeout for health check
            timeout: 3000
        });
        checks.wordpress = true;
    } catch (error) {
        console.error('WP Health Check Failed:', error.message);
        // WP is considered unhealthy if it doesn't respond
        checks.wordpress = false;
    }

    const isHealthy = checks.wordpress && checks.database && checks.redis;

    return {
        status: isHealthy ? 'healthy' : 'degraded',
        checks
    };
};

module.exports = {
    performHealthCheck
};
