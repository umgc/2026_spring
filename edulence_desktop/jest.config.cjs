/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/**/__tests__/**/*.(test|spec).(js|jsx)'],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    '^.+\\.(js|jsx)$': ['@swc/jest'],
  },
  moduleFileExtensions: ['js', 'jsx', 'json'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/test/jest/styleMock.js',
  },
  collectCoverageFrom: [
  'electron/**/*.js',
  'renderer/src/**/*.{js,jsx}',
  '!**/node_modules/**',
  '!renderer/src/main.jsx',

  // ✅ Exclude Electron runtime entrypoints (hard to test in Jest)
  '!electron/main.js',
  '!electron/preload.js',
],
  coverageReporters: ['text', 'lcov', 'html'],
};
