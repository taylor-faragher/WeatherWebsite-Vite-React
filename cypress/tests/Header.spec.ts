describe('Header E2E Tests', () => {
    it(`All Page elements should be visible on desktop`, () => {
        cy.viewport('macbook-15');
        cy.tid(`Header`).should('be.visible');
        cy.tid(`HeaderIcon_home`).should('be.visible');
        cy.tid(`HeaderIcon_FAQ`).should('be.visible');
        cy.tid(`HeaderIcon_github`).should('be.visible');
    });

    it(`All Page elements should be visible on mobile`, () => {
        cy.viewport('iphone-x');
        cy.tid(`Header`).should('be.visible');
        cy.tid(`HeaderIcon_home`).should('be.visible');
        cy.tid(`HeaderIcon_FAQ`).should('be.visible');
        cy.tid(`HeaderIcon_github`).should('be.visible');
    });

    it(`Clicking Home icon goes to home page`, () => {
        cy.visit('/result?zipCode=20020');
        cy.wait('@getWeather1');
        cy.tid(`ResultPage_TempWrapper`).should('be.visible');
        cy.tid(`HeaderIcon_home`).should('be.visible').click();
        cy.url().should('contain', '/main');
    });

    it(`Clicking FAQ icon goes to home page`, () => {
        cy.visit('/result?zipCode=20020');
        cy.wait('@getWeather1');
        cy.tid(`ResultPage_TempWrapper`).should('be.visible');
        cy.tid(`HeaderIcon_FAQ`).should('be.visible').click();
        cy.url().should('contain', '/main');
    });

    it(`Clicking Github icon goes to github page`, () => {
        cy.visit('/result?zipCode=20020');
        cy.wait('@getWeather1');
        cy.tid(`ResultPage_TempWrapper`).should('be.visible');
        cy.tid(`HeaderIcon_github`).should('be.visible').click();
        cy.url().should('contain', 'https://github.com/taylor-faragher/WeatherWebsite-Vite-React');
    });
});
