// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import {mockData} from '../../src/utils/testData/testData';

// Alternatively you can use CommonJS syntax:
// require('./commands')
beforeEach(() => {
    window.sessionStorage.clear();
    const url = Cypress.config()?.baseUrl;
    cy.visit(url as string);
    cy.intercept('GET', 'https://api.taylorsweatherapi.com/?zipcode=20020', {mockData}).as('getWeather');
});
