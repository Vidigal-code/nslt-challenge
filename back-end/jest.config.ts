import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
    preset: 'ts-jest',
    testEnvironment: 'node',

    testMatch: [
        '**/test/**/*.test.ts',
        '**/test/**/*.spec.ts'
    ],


};

export default config;
