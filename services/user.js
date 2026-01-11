const cache = require('./cache');
const { wpClient, getLdAuthHeader } = require('./http');

const CACHE_TTL = 300; // 5 minutes

const getUserDashboard = async (id) => {
    const cacheKey = `sistemagigantes:bff:user:${id}:dashboard`;
    const redis = cache.getClient();

    const cached = await redis.get(cacheKey);
    if (cached) {
        return JSON.parse(cached);
    }

    try {
        // Fetch Basic User Data
        // WP API: /wp/v2/users/<id>
        const userRes = await wpClient.get(`/wp/v2/users/${id}`, {
            headers: {
                Authorization: getLdAuthHeader() // Using LD admin creds to see user data
            }
        });
        const user = userRes.data;

        const dashboard = {
            id: user.id,
            name: user.name,
            avatar_url: user.avatar_urls && user.avatar_urls['96'],
            courses: [],
            warnings: []
        };

        // Circuit Breaker for LearnDash
        // Fetch Enrolled Courses
        // LD API: /ldlms/v2/users-courses?user=<id>
        try {
            const coursesRes = await wpClient.get(`/ldlms/v2/users-courses?user=${id}`, {
                timeout: 3000, // Strict timeout for circuit breaker simulation
                headers: {
                    Authorization: getLdAuthHeader()
                }
            });

            // Map courses
            // The endpoint returns list of course IDs or objects depending on query
            // Usually returns generic post objects.

            // Note: The LD API might respond with "headers" or specific structure.
            // Assuming array of objects.
            const coursesData = Array.isArray(coursesRes.data) ? coursesRes.data : [];

            // Get Progress for each course
            // LD API: /ldlms/v2/users-course-progress_v2?user=<id>&course=<course_id>
            // This is heavy. Let's limit concurrency or check if we can get all at once.
            // Documentation implies one by one.

            const coursesWithProgress = await Promise.all(coursesData.map(async (course) => {
                try {
                    const progressRes = await wpClient.get(`/ldlms/v2/users-course-progress_v2?user=${id}&course=${course.id}`, {
                        timeout: 2000, // Short timeout
                        headers: { Authorization: getLdAuthHeader() }
                    });

                    // Helper to calculate percentage.
                    // Structure depends on LD version. Often has 'steps_completed', 'steps_total'.
                    const pData = progressRes.data;
                    let progressPercent = 0;
                    // Heuristic for progress
                    if (pData.course_progress && pData.course_progress.total_steps > 0) {
                        progressPercent = (pData.course_progress.completed_steps / pData.course_progress.total_steps) * 100;
                    }

                    return {
                        id: course.id,
                        title: course.title && course.title.rendered,
                        progress: Math.round(progressPercent)
                    };
                } catch (err) {
                    return {
                        id: course.id,
                        title: course.title && course.title.rendered,
                        progress: null,
                        error: 'Progress unavailable'
                    };
                }
            }));

            dashboard.courses = coursesWithProgress;

        } catch (error) {
            console.error('LearnDash Circuit Breaker:', error.message);
            dashboard.warnings.push('Cursos indisponíveis temporariamente');
            // We still return user data
        }

        // Cache the result
        await redis.set(cacheKey, JSON.stringify(dashboard), 'EX', CACHE_TTL);

        return dashboard;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw new Error('User not found');
        }
        throw error;
    }
};

module.exports = {
    getUserDashboard
};
