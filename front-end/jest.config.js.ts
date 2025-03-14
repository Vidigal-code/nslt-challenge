module.exports = {
    preset: 'ts-jest',
    moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'node'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/'],
    testMatch: [
        '**/test/**/*.test.ts',
        '**/test/**/*.spec.ts'
    ],
};
