module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/renderer/src/$1",
  },

  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },

  testMatch: ["<rootDir>/renderer/src/**/*.test.jsx"],

  collectCoverageFrom: [
    "renderer/src/**/*.{js,jsx}",
    "!renderer/src/main.jsx",
  ],

  coverageThreshold: {
    global: {
      lines: 60,
      statements: 60,
      branches: 60,
      functions: 60,
    },
  },
};