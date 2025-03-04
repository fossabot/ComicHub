module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules/', '/dist/', '/logs/', '/tmp/'],
    coverageReporters: ['text-summary', 'lcov'],
    collectCoverageFrom: [
        'routes/**/*.ts',
        'middleware/*.ts',
        'sql/*.ts',
        'service/*.ts',
        'utils/*.ts'
    ],
    bail: true
};
