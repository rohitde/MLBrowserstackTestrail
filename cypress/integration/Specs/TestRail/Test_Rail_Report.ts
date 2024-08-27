import { TestRailPage } from '../../../Pages/TestRail_Page'

describe('TestRail Report', () => {
  const testRailPage = new TestRailPage();
  let autoTestRunIds = []


  it('Get the old runs created by automation', () => {
    //For sanity suite
    testRailPage.getOlderAutomationRuns('MLP Sanity Automated Test Run', 14).then((runIds: any[]) => {
      autoTestRunIds = runIds
    })
  })

  it('Close all the old runs created by automation', () => {
    //Close all the older test runs created through automation
    autoTestRunIds.forEach(testRailPage.closeRun)
  })

  it('Trigger TestRail Report', () => {
    testRailPage.triggerReport(2)
  })
})
