const axios = require('axios');
const http = require('http');
const https = require('https');
const config = require('../config');

const httpAgent = new http.Agent({ keepAlive: true });
const httpsAgent = new https.Agent({ keepAlive: true });

const wpClient = axios.create({
    baseURL: config.wordpress.url,
    timeout: 5000, // 5 seconds default timeout
    httpAgent,
    httpsAgent,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Helper for Basic Auth (WooCommerce)
const getWcAuthHeader = () => {
    const auth = Buffer.from(`${config.wordpress.wcConsumerKey}:${config.wordpress.wcConsumerSecret}`).toString('base64');
    return `Basic ${auth}`;
};

// Helper for Application Password (LearnDash)
const getLdAuthHeader = () => {
    const auth = Buffer.from(`${config.wordpress.ldUser}:${config.wordpress.ldAppPassword}`).toString('base64');
    return `Basic ${auth}`;
};

module.exports = {
    wpClient,
    getWcAuthHeader,
    getLdAuthHeader
};
