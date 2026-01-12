const crudService = require('../../services/crud');

// Mock Redis to be safe (though crud.js doesn't use it directly, other imports might)
jest.mock('../../services/cache', () => {
    return {
        getClient: jest.fn(() => ({
            get: jest.fn(),
            set: jest.fn()
        }))
    };
});

describe('Generic CRUD Service with Mocks', () => {

    // Define all resources we implemented mocks for
    const resources = [
        // WP Core
        { namespace: 'wp/v2', resource: 'posts', mockId: 1, name: 'WP Posts' },
        { namespace: 'wp/v2', resource: 'pages', mockId: 2, name: 'WP Pages' }, // List mock has id 2
        { namespace: 'wp/v2', resource: 'users', mockId: 1, name: 'WP Users' },

        // WooCommerce
        { namespace: 'wc/v3', resource: 'orders', mockId: 101, name: 'WC Orders' }, // List mock has id 101
        { namespace: 'wc/v3', resource: 'customers', mockId: 1, name: 'WC Customers' },
        { namespace: 'wc/v3', resource: 'coupons', mockId: 10, name: 'WC Coupons' }, // List mock has id 10
        { namespace: 'wc/v3', resource: 'products/categories', mockId: 15, name: 'WC Categories' }, // List mock has id 15

        // LearnDash
        { namespace: 'ldlms/v2', resource: 'sfwd-lessons', mockId: 201, name: 'LD Lessons' }, // List mock has id 201
        { namespace: 'ldlms/v2', resource: 'sfwd-quiz', mockId: 301, name: 'LD Quizzes' }, // List mock has id 301

        // Special Read-Only / Custom logic handled by generic crud list
        { namespace: 'ldlms/v2', resource: 'users-courses', name: 'LD User Courses', listOnly: true },
    ];

    resources.forEach(testCase => {
        describe(testCase.name, () => {

            it(`should list ${testCase.name} using mocks`, async () => {
                const data = await crudService.list(testCase.namespace, testCase.resource);
                expect(data).toBeDefined();
                expect(Array.isArray(data) || data.code === 'success').toBeTruthy();

                if (Array.isArray(data) && data.length > 0) {
                    // Verify we got the mock data we expect
                    // Most mocks were created with specific data in Stage 2/3
                    expect(data[0]).toBeDefined();
                }
            });

            if (!testCase.listOnly) {
                it(`should get ${testCase.name} by ID using mocks`, async () => {
                    // For Get By ID, our Mock Adapter logic (Stage 2) looks for:
                    // 1. mocks/.../<id>.json
                    // 2. OR mocks/.../default.json
                    // We ensured default.json exists or specific IDs exists.

                    // We pass a random ID 999 to force 'default.json' fallback if specific doesn't exist,
                    // OR we pass the ID we know exists in the 'list' mock if we want to be clean.
                    // However, the Adapter logic for ID is: Check <id>.json, then default.json.
                    // To ensure it works generally, checking 999 (default) is a good test of the fallback.

                    const data = await crudService.get(testCase.namespace, testCase.resource, 999);
                    expect(data).toBeDefined();
                    // Should be an object
                    expect(typeof data).toBe('object');
                    expect(Array.isArray(data)).toBeFalsy();
                });
            }
        });
    });

    // Specific verification for nested report
    describe('WC Reports', () => {
        it('should fetch sales report', async () => {
            const data = await crudService.list('wc/v3', 'reports/sales');
            expect(Array.isArray(data)).toBeTruthy();
            if (data.length > 0) {
                expect(data[0].total_sales).toBeDefined();
            }
        });
    });

    // Specific verification for User Progress (default.json logic)
    describe('LD User Progress', () => {
        it('should fetch user progress', async () => {
            const data = await crudService.list('ldlms/v2', 'users-course-progress_v2', { user: 1, course: 2553 });
            // This endpoint mock returns an object, not array, in default.json
            expect(data).toBeDefined();
            expect(data.code).toBe('success');
        });
    });
});
