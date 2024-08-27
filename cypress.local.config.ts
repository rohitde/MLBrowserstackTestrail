
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { defineConfig } from 'cypress'

export default defineConfig({
  videosFolder: 'cypress/videos',
  screenshotsFolder: 'cypress/screenshots',
  fixturesFolder: 'cypress/fixtures',
  pageLoadTimeout: 150000,
  defaultCommandTimeout: 30000,
  waitForAnimations: true,
  animationDistanceThreshold: 50,
  screenshotOnRunFailure: false,
  video: false,
  chromeWebSecurity: false,
  /*reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/report',
    charts: true,
    reportPageTitle: 'ML Platform',
    embeddedScreenshots: true,
    override: false,
  },*/
  env: {
    DB: {
      user: 'program360_user',
      host: 'p360-stage.mlprivate.net',
      database: 'program360',
      password: '39b5YzGM',
      port: '5432',
    },
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    // baseUrl: 'https://mlplatform-stage.madisonlogic.com',
    specPattern: [
      'cypress/integration/Specs/Sanity/**/*.ts',
      'cypress/integration/Specs/Regression/**/*.ts',
      'cypress/integration/Specs/TestRail/Test_Rail_Report.ts'
    ],
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.ts')(on, config)
    }
  },
})
