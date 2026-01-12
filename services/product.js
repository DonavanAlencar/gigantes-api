const cache = require('./cache');
const { wpClient, getWcAuthHeader, getLdAuthHeader } = require('./http');
const config = require('../config');

const CACHE_TTL = 3600; // 1 hour

const getProduct = async (id) => {
    const cacheKey = `sistemagigantes:bff:product:${id}`;
    const redis = cache.getClient();

    // Cache Aside
    const cached = await redis.get(cacheKey);
    if (cached) {
        return JSON.parse(cached);
    }

    try {
        // Fetch Product from WooCommerce
        const wcRes = await wpClient.get(`/wc/v3/products/${id}`, {
            headers: {
                Authorization: getWcAuthHeader()
            }
        });
        const product = wcRes.data;

        // Extract Related Courses (using metadata)
        // According to report: meta_key: '_related_course'
        // meta_value: "a:4:{i:0;i:2553;i:1;i:2327;i:2;i:2324;i:3;i:1836;}" (PHP Serialized)
        // We might not be able to easily deserialize PHP in JS without a library.
        // Alternative: If LearnDash/WC exposes this in a better way.
        // Or we use a regex or a simple parser if it's just an array of IDs.

        let relatedCourses = [];
        const relatedCourseMeta = product.meta_data.find(m => m.key === '_related_course');

        if (relatedCourseMeta && typeof relatedCourseMeta.value === 'string') {
            // Simple regex to extract integers from the serialized string
            // Matches i:<integer>; or s:<length>:"<value>"; (but here we expect IDs)
            // Example: i:2553;
            const matches = relatedCourseMeta.value.match(/i:(\d+);/g);
            if (matches) {
                // PHP Serialized array: i:0;i:2553;i:1;i:2327;
                // Matches will be: ["i:0;", "i:2553;", "i:1;", "i:2327;"]
                // We want the values (odd indices), not the keys (even indices).
                const allInts = matches.map(m => parseInt(m.match(/i:(\d+);/)[1]));
                relatedCourses = allInts.filter((_, index) => index % 2 !== 0);
            }
        } else if (relatedCourseMeta && Array.isArray(relatedCourseMeta.value)) {
            // Sometimes API returns it deserialized (less likely for this plugin)
            relatedCourses = relatedCourseMeta.value;
        }

        // Fetch Courses Details (Optimized: Parallel or Single call if supported)
        // LD API: /ldlms/v2/sfwd-courses/<id>
        // Use Promise.all
        const courses = await Promise.all(relatedCourses.map(async (courseId) => {
            try {
                // Check cache for individual course first? 
                // Report says: sistemagigantes:bff:product:{id} caches everything.
                // We'll just fetch.
                const courseRes = await wpClient.get(`/ldlms/v2/sfwd-courses/${courseId}`, {
                    headers: {
                        Authorization: getLdAuthHeader()
                    }
                });
                return {
                    id: courseRes.data.id,
                    title: courseRes.data.title && courseRes.data.title.rendered,
                    link: courseRes.data.link
                };
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    return { id: courseId, error: 'Course not found (404)' };
                }
                console.error(`Failed to fetch course ${courseId}:`, err.message);
                return { id: courseId, error: err.message || 'Failed to load course data' };
            }
        }));

        const response = {
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            status: product.status,
            related_courses: courses
        };

        // Save to Redis
        await redis.set(cacheKey, JSON.stringify(response), 'EX', CACHE_TTL);

        return response;

    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw new Error('Product not found');
        }
        throw error;
    }
};

module.exports = {
    getProduct
};
