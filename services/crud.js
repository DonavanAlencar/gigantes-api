const { wpClient, getWcAuthHeader, getLdAuthHeader } = require('./http');

/**
 * Determines the Auth header based on the namespace.
 * - 'wc/v3': WooCommerce (Consumer Key/Secret)
 * - 'ldlms/v2': LearnDash (App Password)
 * - 'wp/v2': WP Core (App Password - reusing LD creds as they are likely Admin)
 */
const getAuthHeader = (namespace) => {
    if (namespace.startsWith('wc/')) {
        return getWcAuthHeader();
    }
    return getLdAuthHeader();
};

const list = async (namespace, resource, params = {}) => {
    const response = await wpClient.get(`/${namespace}/${resource}`, {
        params,
        headers: { Authorization: getAuthHeader(namespace) }
    });
    return response.data;
};

const get = async (namespace, resource, id, params = {}) => {
    const response = await wpClient.get(`/${namespace}/${resource}/${id}`, {
        params,
        headers: { Authorization: getAuthHeader(namespace) }
    });
    return response.data;
};

const create = async (namespace, resource, data) => {
    const response = await wpClient.post(`/${namespace}/${resource}`, data, {
        headers: { Authorization: getAuthHeader(namespace) }
    });
    return response.data;
};

const update = async (namespace, resource, id, data) => {
    const response = await wpClient.put(`/${namespace}/${resource}/${id}`, data, {
        headers: { Authorization: getAuthHeader(namespace) }
    });
    return response.data;
};

const patch = async (namespace, resource, id, data) => {
    const response = await wpClient.post(`/${namespace}/${resource}/${id}`, data, { // Axios/WP often treat patch as POST with specific headers or just PATCH method
        // Using PATCH method directly is better if client supports it
        method: 'PATCH',
        headers: { Authorization: getAuthHeader(namespace) }
    });
    return response.data;
};

// WP specific: Delete often requires ?force=true to actually delete, otherwise trashes.
const remove = async (namespace, resource, id, params = {}) => {
    const response = await wpClient.delete(`/${namespace}/${resource}/${id}`, {
        params,
        headers: { Authorization: getAuthHeader(namespace) }
    });
    return response.data;
};

module.exports = {
    list,
    get,
    create,
    update,
    patch,
    remove
};
