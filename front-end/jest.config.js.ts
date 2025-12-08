module.exports = {
    preset: 'ts-jest/presets/js-with-ts-esm',
    testEnvironment: 'jsdom',
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    globals: {
        'ts-jest': {
            useESM: true,
            tsconfig: 'tsconfig.json',
        },
    },
    moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'node'],
    transform: {
        '^.+\\.[tj]sx?$': [
            'ts-jest',
            {
                useESM: true,
                tsconfig: 'tsconfig.json',
            },
        ],
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/'],
    testMatch: [
        '<rootDir>/test/**/*.(test|spec).ts',
        '<rootDir>/test/**/*.(test|spec).tsx'
    ],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
};
