describe('HomePage E2E Tests', () => {
    it(`All Page elements should be visible`, () => {
        cy.tid(`HomePage_WelcomeTitle`).should('be.visible');
        cy.tid(`HomePage_Title`).should('be.visible');
        cy.tid(`ZipCodeForm`).should('be.visible');
        cy.tid(`ZipCodeButtonSearch`).should('be.visible');
        cy.tid(`ErrorMessage`).should('not.exist');
    });

    it(`Should navigate to results page when valid zip code is entered`, () => {
        cy.tid(`ZipCodeForm`).should('be.visible');
        cy.tid(`ErrorMessage`).should('not.exist');
        cy.tid(`ZipCodeInput`).type('20020', {delay: 100});
        cy.tid(`ZipCodeForm`).submit();
        cy.url().should('contain', '/result?zipCode=20020');
    });

    it(`Should navigate to results page when valid zip code is entered and user types Enter`, () => {
        cy.tid(`ZipCodeForm`).should('be.visible');
        cy.tid(`ErrorMessage`).should('not.exist');
        cy.tid(`ZipCodeInput`).should('be.visible').type('20020{enter}');
        cy.url().should('contain', '/result?zipCode=20020');
    });

    it(`Should show Error message when ZipCode is too few characters`, () => {
        cy.tid(`ZipCodeForm`).should('be.visible');
        cy.tid(`ZipCodeInput`).should('be.visible').type('111');
        cy.tid(`ZipCodeButtonSearch`).should('be.visible').click();
        cy.tid(`ErrorMessage`).should('be.visible');
    });

    it(`Should show Error message when ZipCode is blank`, () => {
        cy.tid(`ZipCodeForm`).should('be.visible');
        cy.tid(`ZipCodeInput`).should('be.visible');
        cy.tid(`ZipCodeButtonSearch`).should('be.visible').click();
        cy.tid(`ErrorMessage`).should('be.visible');
    });

    it(`Should only allow numbers to be entered in zip code search bar`, () => {
        cy.tid(`ZipCodeForm`).should('be.visible');
        cy.tid(`ZipCodeInput`).should('be.visible');
        cy.tid(`ZipCodeInput`).type('abcd200ljsdf20');
        cy.tid(`ZipCodeInput`).should('have.value', '20020');
    });

    it(`Should navigate to results page after valid zip code is entered and error message is showing`, () => {
        cy.tid(`ZipCodeForm`).should('be.visible');
        cy.tid(`ZipCodeInput`).should('be.visible').type('200');
        cy.tid(`ZipCodeButtonSearch`).should('be.visible').click();
        cy.tid(`ErrorMessage`).should('be.visible');
        cy.tid(`ZipCodeInput`).should('be.visible').type('20020{enter}');
        cy.url().should('contain', '/result?zipCode=20020');
    });
});
