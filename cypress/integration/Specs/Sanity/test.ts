
describe("Debugging the Cypress TestRail issue", () => {

    it('C6164: Navigation to program details page.', () => {
        cy.visit('https://www.google.com')
        .then(() => cy.wait(2000))
        .then(() =>cy.title().should('equal', 'Google'))
    })

    it('C6168: Account Engagement chart is visible.', () => {
        cy.visit('https://www.google.com')
        .then(() => cy.wait(2000))
        .then(() =>cy.title().should('equal', 'Google.com'))
    })
})