module.exports = {
    testEnvironment: 'node',
    setupFiles: ['<rootDir>/tests/setup.js'],
    verbose: true,
    // Clear mocks between tests
    clearMocks: true,
    cacheDirectory: '<rootDir>/.jest-cache',
};
