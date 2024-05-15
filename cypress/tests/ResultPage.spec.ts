describe('ResultPage E2E Tests', () => {
    it(`All Page elements should be visible and clicking return home navigates back to home page`, () => {
        cy.visit('/result?zipCode=20020');
        cy.wait('@getWeather');
        cy.tid(`ResultPage_ZipCodeTitle`).should('be.visible');
        cy.tid(`ResultPage_WeatherPic`).should('be.visible');
        cy.tid(`ResultPage_CurrentTemp`).should('be.visible');
        cy.tid(`ResultPage_Description`).should('be.visible');
        cy.tid('ReturnButton').should('be.visible').click();
        cy.url().should('contain', '/main');
    });

    it(`Passing partial zip code in parameters causes a redirect to Error page`, () => {
        cy.visit('/result?zipCode=200');
        cy.url().should('contain', '/error');
    });

    it(`Passing bad zip code in parameters causes a redirect to Error page`, () => {
        cy.visit('/result?zipCode=11111');
        cy.url().should('contain', '/error');
    });

    it(`Passing empty zip code in parameters causes a redirect to Error page`, () => {
        cy.visit('/result?zipCode=');
        cy.url().should('contain', '/error');
    });

    it(`Should navigate to error page if no parameters are passed to result page`, () => {
        cy.visit('/result');
        cy.url().should('contain', '/error');
    });
});
