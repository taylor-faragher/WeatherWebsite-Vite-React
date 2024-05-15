describe('ErrorPage E2E Tests', () => {
    it(`All Page elements should be visible and clicking return home navigates back to home page`, () => {
        cy.visit('/error');
        cy.tid(`Error_ErrorText`).should('be.visible');
        cy.tid(`ReturnButton`).should('be.visible').click();
        cy.url().should('contain', '/main');
    });
});
