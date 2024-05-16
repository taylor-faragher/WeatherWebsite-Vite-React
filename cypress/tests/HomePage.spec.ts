describe('HomePage E2E Tests', () => {
    it(`All Page elements should be visible`, () => {
        cy.tid(`HomePage_WelcomeTitle`).should('be.visible');
        cy.tid(`HomePage_Title`).should('be.visible');
        cy.tid(`HomePage_ZipCodeForm`).should('be.visible');
        cy.tid(`HomePage_ZipCodeButtonSearch`).should('be.visible');
        cy.tid(`HomePage_ErrorMessage`).should('not.exist');
    });

    it(`Should navigate to results page when valid zip code is entered`, () => {
        cy.tid(`HomePage_ZipCodeForm`).should('be.visible');
        cy.tid(`HomePage_ErrorMessage`).should('not.exist');
        cy.tid(`HomePage_ZipCodeInput`).type('20020', {delay: 100});
        cy.tid(`HomePage_ZipCodeInput`).trigger('event');
        cy.tid(`HomePage_ZipCodeForm`).submit();
        cy.url().should('contain', '/result?zipCode=20020');
    });

    it(`Should navigate to results page when valid zip code is entered and user types Enter`, () => {
        cy.tid(`HomePage_ZipCodeForm`).should('be.visible');
        cy.tid(`HomePage_ErrorMessage`).should('not.exist');
        cy.tid(`HomePage_ZipCodeInput`).should('be.visible').type('20020{enter}');
        cy.url().should('contain', '/result?zipCode=20020');
    });

    it(`Should show Error message when ZipCode is too few characters`, () => {
        cy.tid(`HomePage_ZipCodeForm`).should('be.visible');
        cy.tid(`HomePage_ZipCodeInput`).should('be.visible').type('111');
        cy.tid(`HomePage_ZipCodeButtonSearch`).should('be.visible').click();
        cy.tid(`HomePage_ErrorMessage`).should('be.visible');
    });

    it(`Should show Error message when ZipCode is blank`, () => {
        cy.tid(`HomePage_ZipCodeForm`).should('be.visible');
        cy.tid(`HomePage_ZipCodeInput`).should('be.visible');
        cy.tid(`HomePage_ZipCodeButtonSearch`).should('be.visible').click();
        cy.tid(`HomePage_ErrorMessage`).should('be.visible');
    });

    it(`Should only allow numbers to be entered in zip code search bar`, () => {
        cy.tid(`HomePage_ZipCodeForm`).should('be.visible');
        cy.tid(`HomePage_ZipCodeInput`).should('be.visible');
        cy.tid(`HomePage_ZipCodeInput`).type('abcd200ljsdf20');
        cy.tid(`HomePage_ZipCodeInput`).should('have.value', '20020');
    });

    it(`Should navigate to results page after valid zip code is entered and error message is showing`, () => {
        cy.tid(`HomePage_ZipCodeForm`).should('be.visible');
        cy.tid(`HomePage_ZipCodeInput`).should('be.visible').type('200');
        cy.tid(`HomePage_ZipCodeButtonSearch`).should('be.visible').click();
        cy.tid(`HomePage_ErrorMessage`).should('be.visible');
        cy.tid(`HomePage_ZipCodeInput`).should('be.visible').type('20020{enter}');
        cy.url().should('contain', '/result?zipCode=20020');
    });
});
