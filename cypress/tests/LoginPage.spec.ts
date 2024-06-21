import { getTestCredentials } from "../utils/getTestCredentials";

const navigateToLogin = () => {
    cy.visit('/login');
    cy.tid('LoginPage_LoginPageForm').should('be.visible');
}

describe('Login E2E Tests', () => {

    it(`General navigation on login page works`, async () => {
        navigateToLogin();
        cy.tid(`SignUpLink`).should('be.visible').click();
        cy.tid('SignUpPageForm').should('be.visible');
        cy.tid('LoginDiv').should('be.visible');
        cy.tid('LoginLink').should('be.visible').click();
        cy.tid('LoginPage_LoginPageForm').should('be.visible');
        cy.tid('ForgotPasswordWrapper').should('be.visible');
        cy.tid('ForgotPasswordLink').should('be.visible').click();
        cy.tid('ForgotPasswordPageForm').should('be.visible');
        cy.tid('LoginLinkWrapper').should('be.visible');
        cy.tid('LoginLink').should('be.visible').click();
        cy.tid('LoginPage_LoginPageForm').should('be.visible');
    });
    //will come back to this later once I learn more about cognito login with cypress
    //https://docs.cypress.io/guides/end-to-end-testing/amazon-cognito-authentication
    // it(`All elements are visible and user can login`, async () => {
    //     navigateToLogin();
    //     cy.intercept('POST', 'https://cognito-idp.us-east-1.amazonaws.com/', {}).as('mockedLogin');
    //     cy.tid('LoginPage_LoginPageForm').should('be.visible');
    //     cy.tid('LoginPage_EmailLoginText').should('be.visible');
    //     cy.tid('LoginPage_PasswordLoginText').should('be.visible');
    //     cy.tid('LoginPage_EmailInput').should('be.visible');
    //     cy.tid('LoginPage_PasswordInput').should('be.visible');
    //     cy.tid('ShowPasswordToggle').should('be.visible');
    //     cy.tid('ShowPasswordToggle').should('be.visible');
    //     cy.tid(`SignUpLink`).should('be.visible');
    //     cy.tid('ForgotPasswordLink').should('be.visible');
    //     cy.tid('LoginPage_EmailInput').type(`test@test.com`, {
    //         log: false,
    //     });
    //     cy.tid('LoginPage_PasswordInput').type(`Password@1`, {
    //         log: false,
    //     });
    //     cy.tid('LoginPageFormButton').should('be.visible').click();
    //     cy.wait('@mockedLogin');
    //     cy.url().should('contain', '/main');
    // });
});