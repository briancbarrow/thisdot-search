module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: ['<rootDir>/src/**/*.test.js'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  globals: {
    'vue-jest': {
      babelConfig: true,
    },
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/components/*.vue', '!**/node_modules/**'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
};
