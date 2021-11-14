describe('It should login successfully', () => {
    before(() => {
        cy.visit('http://localhost:8080');
        cy.get('#login_email').type('hello@test.com');
        cy.get('#login_password').type('hellofromotherside');
        cy.get('.ant-btn').click();
    });
});
