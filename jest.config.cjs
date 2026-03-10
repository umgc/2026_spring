/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/**/__tests__/**/*.(test|spec).(js|jsx)"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.cjs"],
  transform: {
    "^.+\\.(js|jsx)$": ["@swc/jest"]
  },
  moduleFileExtensions: ["js", "jsx", "json"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/test/jest/styleMock.js"
  },
  collectCoverageFrom: [
    "electron/**/*.js",
    "renderer/src/**/*.{js,jsx}",
    "!**/node_modules/**",
    "!renderer/src/main.jsx",
    "!renderer/src/**/*.test.{js,jsx}",
    "!renderer/src/**/__tests__/**",
    "!electron/main.js",
    "!electron/preload.js"
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/renderer/src/__tests__/",
    "/test/"
  ],
  coverageReporters: ["text", "lcov", "html"]
};