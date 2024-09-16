module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
}
