/* eslint-disable no-debugger */
const autoTestNames = []
const autoTestRunIds = []
let lengthOfResponse


export class TestRailPage {
  getOlderAutomationRuns(nameReference, suiteId) {
    return new Promise((resolve) => {
      cy.request({
        method: 'GET',
        url: 'https://madlog.testrail.io/index.php?/api/v2/get_runs/3&is_completed=0&suite_id=' + suiteId,
        auth: {
          username: 'shrikant.ghongte@globallogic.com',
          password: '************'
        }
      }).then((resp) => {
        expect(resp.status).to.eq(200);
        lengthOfResponse = resp.body.runs.length
        for (let count = 0; count < lengthOfResponse; count++) {
          if ((resp.body.runs[count].name).includes(nameReference)) {
            autoTestRunIds.push(resp.body.runs[count].id)
            autoTestNames.push(resp.body.runs[count].name);
          }
        }
        //Remove the first automation run from the list
        autoTestRunIds.shift()
        resolve(autoTestRunIds)
      })
    })
  }

  closeRun(runId) {
    cy.request({
      method: 'POST',
      url: 'https://madlog.testrail.io/index.php?/api/v2/close_run/' + runId,
      headers: {
        'Content-Type': 'application/json'
      },
      auth: {
        username: 'shrikant.ghongte@globallogic.com',
        password: '************'
      }
    }).then((resp) => {
      expect(resp.status).to.eq(200);
      cy.log('Test Run closed successfully, for ID:' + runId)
    })
  }

  triggerReport(apiTemplateId) {
    cy.request({
      method: 'GET',
      //run report by passing API template Id
      url: 'https://madlog.testrail.io/index.php?/api/v2/run_report/' + apiTemplateId,
      auth: {
        username: 'shrikant.ghongte@globallogic.com',
        password: '************'
      }
    }).then((resp) => {
      expect(resp.status).to.eq(200);
      cy.log('Test Rail report triggered successfully')
    })

  }

}
