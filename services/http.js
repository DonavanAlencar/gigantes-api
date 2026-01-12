const axios = require('axios');
const http = require('http');
const https = require('https');
const config = require('../config');

const httpAgent = new http.Agent({ keepAlive: true });
const httpsAgent = new https.Agent({ keepAlive: true });

const wpClient = axios.create({
    baseURL: config.wordpress.url,
    timeout: 15000, // 15 seconds default timeout
    httpAgent,
    httpsAgent,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Mock Adapter Implementation
if (process.env.USE_MOCKS === 'true') {
    const fs = require('fs');
    const path = require('path');
    console.log('⚠️  USING MOCKS FOR EXTERNAL HTTP CALLS ⚠️');

    wpClient.defaults.adapter = async (config) => {
        return new Promise((resolve, reject) => {
            const url = config.url || '';
            let mockFile = '';

            // Generic Router
            // Improved Regex to handle nested resources like 'products/categories' or 'reports/sales'.
            // Strategy: Check specifically for known nested patterns first, or use a more greedy match.
            // But 'products/123' vs 'products/categories' is ambiguous without knowledge.
            // Let's hardcode known nested valid endpoints for this project as exceptions, or check directory existence.

            // Simple approach: Capture up to 2 segments after version.
            const regex = /^\/?(?:(wc)\/v3|(ldlms)\/v2|(wp)\/v2)\/(.+)/;
            const match = url.match(regex);

            if (match) {
                const ns = match[1] || match[2] || match[3]; // wc, ldlms, wp
                const pathSuffix = match[4].split('?')[0]; // e.g. "products/categories", "products/123" (strip query)

                // We need to decide what part is 'resource' and what is 'id'.
                // Heuristic:
                // 1. Check if full path maps to a directory -> It's a list (resource=full path).
                // 2. Else, split last segment as ID, rest as resource.

                const folderNs = ns === 'ldlms' ? 'ld' : ns;
                const rootMockDir = path.resolve(process.cwd(), `mocks/wordpress/${folderNs}`);
                const possibleDir = path.join(rootMockDir, pathSuffix);

                let resource, id;

                if (fs.existsSync(possibleDir) && fs.lstatSync(possibleDir).isDirectory()) {
                    // It is a directory (e.g. products/categories, or products)
                    resource = pathSuffix;
                    id = null;
                } else {
                    // It is not a directory. Assume last part is ID.
                    const parts = pathSuffix.split('/');
                    if (parts.length > 1) {
                        id = parts.pop();
                        resource = parts.join('/');
                    } else {
                        // Should have been a directory if it was a list root... 
                        // But maybe directory is missing?
                        resource = pathSuffix;
                        id = null;
                    }
                }

                const baseDir = path.join(rootMockDir, resource);

                if (id) {
                    // Try specific ID
                    const specific = path.join(baseDir, `${id}.json`);
                    const def = path.join(baseDir, 'default.json');

                    if (fs.existsSync(specific)) {
                        mockFile = specific;
                    } else if (fs.existsSync(def)) {
                        mockFile = def;
                    } else {
                        // Fallback: Check if list exists, maybe? No, usually ID call expects object.
                        // If really nothing found, we let fall through to 404
                    }
                } else {
                    // List
                    const list = path.join(baseDir, 'list.json');
                    if (fs.existsSync(list)) {
                        mockFile = list;
                    }
                    // Some endpoints like singletons (users-course-progress) might behave like "default" without ID?
                    // Check if there is a 'default.json' for the resource root? 
                    // e.g. users-course-progress_v2/default.json
                    const rootDefault = path.join(baseDir, 'default.json');
                    if (!mockFile && fs.existsSync(rootDefault)) {
                        mockFile = rootDefault;
                    }
                }
            } else {
                console.log(`[MOCK] URL ${url} did not match supported patterns.`);
            }

            if (mockFile && fs.existsSync(mockFile)) {
                try {
                    const data = JSON.parse(fs.readFileSync(mockFile, 'utf8'));
                    console.log(`[MOCK] Serving ${mockFile} for ${url}`);
                    resolve({
                        data,
                        status: 200,
                        statusText: 'OK',
                        headers: {},
                        config,
                        request: {}
                    });
                } catch (e) {
                    reject({ message: 'Failed to parse mock file', config, response: { status: 500 } });
                }
            } else {
                console.log(`[MOCK] No mock found for ${url}, returning 404`);
                // Simulate 404 for unknown mocks
                reject({
                    message: 'Request failed with status code 404',
                    name: 'AxiosError',
                    code: 'ERR_BAD_REQUEST',
                    config,
                    response: {
                        status: 404,
                        statusText: 'Not Found',
                        data: { code: 'rest_no_route', message: 'No route was found matching the URL and request method', data: { status: 404 } }
                    }
                });
            }
        });
    };
}

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
