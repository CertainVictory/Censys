import { defineConfig } from 'cypress';
import { Buffer } from 'buffer';
export default defineConfig({
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
  e2e: {
    supportFile: 'cypress/support/e2e.{js,jsx,ts,tsx}',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:5173',
    env: {
      API_URL: 'https://search.censys.io/api/v2/hosts/search',
      AUTH_HEADER: Buffer.from(
        'fb9f70ae-b7c1-454f-be21-b4220d2bf972:andKBrYYZ7PYbxecYRkoJJ5uo8kiPI7M'
      ).toString('base64'),
    },
  },
});
