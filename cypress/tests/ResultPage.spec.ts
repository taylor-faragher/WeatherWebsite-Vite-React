describe('ResultPage E2E Tests', () => {
    it(`All Page elements should be visible and clicking return home navigates back to home page`, () => {
        cy.visit('/result?zipCode=20020');
        cy.wait('@getWeather1');
        cy.tid(`ResultPage_ZipCodeTitle`).should('be.visible');
        cy.tid(`ResultPage_WeatherPic`).should('be.visible');
        cy.tid(`ResultPage_TempWrapper`).should('be.visible');
        cy.tid(`ResultPage_Description`).should('be.visible');
        cy.tid(`ZipCodeForm`).should('be.visible');
        cy.tid(`ZipCodeInput`).should('be.visible');
        cy.tid(`ZipCodeButtonSearch`).should('be.visible');
        cy.tid('HeaderIcon_home').should('be.visible').click();
        cy.url().should('contain', '/main');
    });

    it(`User can search zip code again from result page`, () => {
        cy.visit('/result?zipCode=20020');
        cy.wait('@getWeather1');
        cy.tid(`ResultPage_TempWrapper`).should('be.visible');
        cy.tid(`ZipCodeForm`).should('be.visible');
        cy.tid(`ZipCodeInput`).should('be.visible');
        cy.tid(`ZipCodeInput`).type('20005', {delay: 100});
        cy.tid(`ZipCodeForm`).submit();
        cy.url().should('contain', '/result?zipCode=20005');
        cy.wait('@getWeather2');
        cy.tid(`ResultPage_TempWrapper`).should('be.visible');
    });

    it(`Passing partial zip code in parameters causes a redirect to Error page`, () => {
        cy.visit('/result?zipCode=200');

        cy.url({timeout: 30000}).should('contain', '/error');
    });

    it(`Passing bad zip code in parameters causes a redirect to Error page`, () => {
        cy.visit('/result?zipCode=11111');
        cy.url({timeout: 30000}).should('contain', '/error');
    });

    it(`Passing empty zip code in parameters causes a redirect to Error page`, () => {
        cy.visit('/result?zipCode=');
        cy.url({timeout: 30000}).should('contain', '/error');
    });

    it(`Should navigate to error page if no parameters are passed to result page`, () => {
        cy.visit('/result');
        cy.url({timeout: 30000}).should('contain', '/error');
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
});
