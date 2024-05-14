describe('HomePage E2E Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173');
    });

    it(`Should have visible elements`, () => {
        cy.tid(`HomePage_WelcomeTitle`).should('be.visible');
    });
});
