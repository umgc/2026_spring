module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['**/__tests__/**/*.test.ts?(x)'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@expo|expo(nent)?|expo-.*)/)'
  ],
  moduleNameMapper: {
    '^@expo/vector-icons$': '<rootDir>/src/__tests__/mocks/vector-icons.tsx'
  }
};
