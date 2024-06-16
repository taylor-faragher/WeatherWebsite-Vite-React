const navigateToSignup = () => {
    cy.visit('/login');
    cy.tid(`SignUpLink`).should('be.visible').click();
    cy.tid('SignUpPageForm').should('be.visible');
}

describe('SignUp E2E Tests', () => {
    it(`All elements visible`, () => {
        navigateToSignup();

        cy.tid('SignUpTextUsername').should('be.visible');
        cy.tid('SignUpEmailInput').should('be.visible');
        cy.tid('SignUpTextPassword').should('be.visible');
        cy.tid('SignUpForm_PasswordInput').should('be.visible');
        cy.tid('ShowPassword').should('be.visible');
        cy.tid('SignUpButton').should('be.visible');
        cy.tid('ErrorMessage').should('not.exist');
        cy.tid('LoginDiv').should('be.visible');
        cy.tid('LoginLink').should('be.visible');
        cy.tid('SignUpEmailInput').type('test@test.com');
        cy.tid('SignUpForm_PasswordInput').type('123!secret', {
            log: false,
        });
    });

    it(`Entering a bad email does not allow the user to sign up`, () => {
        navigateToSignup();
        cy.tid('SignUpEmailInput').should('have.prop', 'nodeName', 'INPUT').and('have.attr', 'type', 'email');
        cy.tid('SignUpEmailInput').type('test.com');
        cy.tid('SignUpForm_PasswordInput').type('123!secret', {
            log: false,
        });
        cy.tid('SignUpButton').click();
        cy.url().should('contain', '/login');
        //if the signup and password field are still visible, it means we didn't leave the signup page due to an error
        //Using this to test the validation tooltip that appears for input type email
        cy.tid('SignUpTextUsername').should('be.visible');
        cy.tid('SignUpEmailInput').should('be.visible');
        cy.tid('SignUpTextPassword').should('be.visible');
        cy.tid('SignUpForm_PasswordInput').should('be.visible');
    });

    it(`Password field hides and shows password when show password button is pressed`, () => {
        navigateToSignup();
        cy.tid('SignUpForm_PasswordInput').should('have.prop', 'nodeName', 'INPUT').and('have.attr', 'type', 'password');
        cy.tid('SignUpForm_PasswordInput').type('123!secret', {
            log: false,
        });
        cy.tid('ShowPassword').should('be.visible').click();
        cy.tid('SignUpForm_PasswordInput').should('have.attr', 'type', 'text');
        cy.tid('ShowPassword').click();
        cy.tid('SignUpForm_PasswordInput').should('have.attr', 'type', 'password');
    });

    it(`Error message appears if password does not contain a capital letter`, () => {
        navigateToSignup();
        cy.tid('ErrorMessage').should('not.exist');
        cy.tid('SignUpEmailInput').type('test@test.com');
        cy.tid('SignUpForm_PasswordInput').type('123!secret', {
            log: false,
        });
        cy.tid('SignUpButton').click();
        cy.tid('ErrorMessage').should('be.visible');
        cy.tid('ErrorMessage').contains('Password does not meet requirements. Please see password criteria above');

    });

    it(`Error message appears if password does not contain a number`, () => {
        navigateToSignup();
        cy.tid('ErrorMessage').should('not.exist');
        cy.tid('SignUpEmailInput').type('test@test.com');
        cy.tid('SignUpForm_PasswordInput').type('!SecretPassword', {
            log: false,
        });
        cy.tid('SignUpButton').click();
        cy.tid('ErrorMessage').should('be.visible');
        cy.tid('ErrorMessage').contains('Password does not meet requirements. Please see password criteria above');

    });

    it(`Error message appears if password does not contain a special character`, () => {
        navigateToSignup();
        cy.tid('ErrorMessage').should('not.exist');
        cy.tid('SignUpEmailInput').type('test@test.com');
        cy.tid('SignUpForm_PasswordInput').type('123SecretPassword', {
            log: false,
        });
        cy.tid('SignUpButton').click();
        cy.tid('ErrorMessage').should('be.visible');
        cy.tid('ErrorMessage').contains('Password does not meet requirements. Please see password criteria above');

    });

    it(`Error message appears if password is not long enough`, () => {
        navigateToSignup();
        cy.tid('ErrorMessage').should('not.exist');
        cy.tid('SignUpEmailInput').type('test@test.com');
        cy.tid('SignUpForm_PasswordInput').type('!Secret', {
            log: false,
        });
        cy.tid('SignUpButton').click();
        cy.tid('ErrorMessage').should('be.visible');
        cy.tid('ErrorMessage').contains('Password does not meet requirements. Please see password criteria above');

    });

    it(`Error message appears if password is empty and user clicks sign up button`, () => {
        navigateToSignup();
        cy.tid('ErrorMessage').should('not.exist');
        cy.tid('SignUpEmailInput').type('test@test.com');
        cy.tid('SignUpButton').click();
        cy.tid('ErrorMessage').should('be.visible');
        cy.tid('ErrorMessage').contains('Password does not meet requirements. Please see password criteria above');
    });

    it(`Error message appears if username is empty and user clicks sign up button`, () => {
        navigateToSignup();
        cy.tid('ErrorMessage').should('not.exist');
        cy.tid('SignUpForm_PasswordInput').type('!Secret', {
            log: false,
        });        
        cy.tid('SignUpButton').click();
        cy.tid('ErrorMessage').should('be.visible');
    });

    it(`User can navigate to login page from sign up page`, () => {
        navigateToSignup();
        cy.tid('LoginDiv').should('be.visible');
        cy.tid('LoginLink').should('be.visible').click();
        cy.url().should('contain', '/login');
        cy.tid('LoginPage_LoginPageForm').should('be.visible');
    });
});