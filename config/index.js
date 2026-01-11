require('dotenv').config();

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    logLevel: process.env.LOG_LEVEL || 'info',
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    redis: {
        url: process.env.REDIS_URL,
    },
    wordpress: {
        url: process.env.WP_API_URL,
        wcConsumerKey: process.env.WC_CONSUMER_KEY,
        wcConsumerSecret: process.env.WC_CONSUMER_SECRET,
        ldUser: process.env.LD_API_USER,
        ldAppPassword: process.env.LD_APP_PASSWORD,
    },
};

module.exports = config;
