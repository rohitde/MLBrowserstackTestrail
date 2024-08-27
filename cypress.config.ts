/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineConfig } from "cypress";
import fetch from './node_modules/node-fetch';
import moment from 'moment';
const TestRailReporter = require('cypress-testrail');

export default defineConfig({
  "defaultCommandTimeout": 30000,
  "pageLoadTimeout": 100000,
  "waitForAnimations": true,
  "animationDistanceThreshold": 50,
  "retries": 1,
  "screenshotOnRunFailure": true,
  "video": false,
  "chromeWebSecurity": false,
  env: {
    ENV: '',
    TEST_URL: '',
    testrail: {
      "domain": "https://madlog.testrail.io/",
      "username": "shrikant.ghongte@globallogic.com",
      "password": "************",
      "projectId": "3",
      "milestoneId": "",
      "suiteId": "14",
      "runName": "MLP Sanity Automated Test Run",
      "closeRun": false,
      "screenshots": true,
      "runId": 0
    },
  },
  // "projectId": 3,
  // "suiteId": 14,
  // "runName": "MLP Sanity Automated Test Run",
  e2e: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //specPattern: 'cypress/e2e/**/**/*.{js,jsx,ts,tsx}'
    specPattern: ['cypress/integration/Specs/Sanity/**/*.ts'
    ],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        // deleteFolder: customPlugins.deleteFolder,
        // readFileNames: customPlugins.readFileNames,
        //DATABASE: customPlugins.DATABASE,
        // readXlsx: customPlugins.readXlsx,
        //  writeIntoJson: customPlugins.writeIntoJson,
        // writeDataIntoXlsx:customPlugins.writeDataIntoXlsx
      });
      async function createTestRun() {
        const executionDateTime = moment().format('MMM Do YYYY, HH:mm (Z)');
        // eslint-disable-next-line prefer-const
        const response = await fetch('https://madlog.testrail.io/index.php?/api/v2/add_run/3', /* Project id */{
          method: 'post',
          headers: {
            "Content-type": "application/json",
            "Authorization": 'Basic ' + (Buffer.from('shrikant.ghongte@globallogic.com:************').toString('base64'))
          },
          body: JSON.stringify({ suite_id: 14, description: 'Currently Running', name: 'MLP Sanity Automated Test Run- ' + config.env.ENV + ' ' + executionDateTime }),
          credentials: 'same-origin'
        });
        const resObj = await response.json();
        return resObj;
      }

      //get run id request
      async function getTestRuns() {
        await new Promise(resolve => setTimeout(resolve, 50000));
        // eslint-disable-next-line prefer-const
        const response = await fetch('https://madlog.testrail.io/index.php?/api/v2/get_runs/3&is_completed=0&limit=2',/*Project id*/ {
          method: 'get',
          headers: {
            "Content-type": "application/json",
            "Authorization": 'Basic ' + (Buffer.from('shrikant.ghongte@globallogic.com:************').toString('base64'))
          },
          credentials: 'same-origin'
        });
        const resObj = await response.json();
        return resObj;
      }

      //update run id request
      async function updateRunRequest(runId: string) {
        console.log('Inside update function and input parameter runid:' + runId);
        const getResOjb = await getTestRuns();
        const oldRunId = JSON.stringify(getResOjb.runs[0].id);
        const oldRunDiscp = JSON.stringify(getResOjb.runs[0].description);
        console.log('Testrail run id for update:' + oldRunId);
        console.log('Testrail run Description before update:' + oldRunDiscp);
        if (oldRunDiscp.includes('Currently Running') && oldRunId === runId) {
          // eslint-disable-next-line prefer-const
          const response = await fetch('https://madlog.testrail.io/index.php?/api/v2/update_run/' + oldRunId, {
            method: 'post',
            headers: {
              "Content-type": "application/json",
              "Authorization": 'Basic ' + (Buffer.from('shrikant.ghongte@globallogic.com:************').toString('base64'))
            },
            body: JSON.stringify({ description: null, include_all: true }),
            credentials: 'same-origin'
          });
          const resObj = await response.json();
          return resObj;
        }
      }

      async function modifyConfig() {
        const getResOjb = await getTestRuns();
        //console.log('Testrail run resposne' + JSON.stringify(getResOjb.runs[0]));
        const oldRunDiscp = JSON.stringify(getResOjb.runs[0].description);
        const oldRunName = JSON.stringify(getResOjb.runs[0].name);
        console.log('Testrail run Description:' + oldRunDiscp);
        console.log('Testrail run Name:' + oldRunName);

        if (oldRunDiscp.includes('Currently Running') && oldRunName.includes(('MLP Sanity Automated Test Run- ') + config.env.ENV)) {
          config.env.testrail.runId = await JSON.stringify(getResOjb.runs[0].id)
          // console.log('Reporter ID inside if look' + config.env.testrail.runId);
          const updateResOjb = await updateRunRequest(JSON.stringify(getResOjb.runs[0].id));
          // console.log('Description inside if look after update function' + JSON.stringify(updateResOjb));
        } else {
          const mResObj = await createTestRun();
          console.log('Testrail Response' + JSON.stringify(mResObj.id));
          config.env.testrail.runId = await JSON.stringify(mResObj.id)
          console.log('Reporter ID inside function' + config.env.testrail.runId);
        }
      }

      //This logic is design to work only when executed automation with testrail using 2 parallel thread in browserstack.
      await modifyConfig()
      console.log('Reporter ID outside function' + config.env.testrail.runId);
      new TestRailReporter(on, config).register();
      return config
    },
  },
});
