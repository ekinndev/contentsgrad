describe('Authentication', () => {
    it('It should be login successfully', () => {
        cy.visit('http://localhost:8080');
        cy.get('#login_email').type('hello@test.com');
        cy.get('#login_password').type('hellofromotherside');
        cy.get('.ant-btn').click();

        cy.get('body').contains('Homepage');
    });

    it('It should be logout successfully', () => {
        cy.contains('Log out').click();
        cy.get('body').not('Homepage');
    });
});
