import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4914',
    supportFile: false,
  },

  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts',
  },
  env: {
    apiUrl: 'http://localhost:3000',
  },
  // screenshotOnRunFailure: true,
  // screenshotsFolder: 'cypress/reports/screenshots',
  // video: true,
  // videoCompression: 48,
  // videosFolder: 'cypress/reports/videos',
});
