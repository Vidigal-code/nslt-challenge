/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
      },
    ],
  },
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'node'],
  testMatch: ['<rootDir>/test/**/*.(test|spec).[tj]s?(x)'],
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
};

