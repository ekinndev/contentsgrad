describe('Languages', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080');
        cy.get('#login_email').type('hello@test.com');
        cy.get('#login_password').type('hellofromotherside');
        cy.get('.ant-btn').click();
    });

    it('it should be create a language succesfully', () => {
        cy.get('[data-v-005bfc5a]').contains('Settings').click();
        cy.get('[data-v-005bfc5a]').contains('Languages').click();
        cy.get('[data-v-02e4c64b]').contains('Add a new language').click();
        cy.get('input[data-v-4330c0b2]#languages_name').type('Test lan');
        cy.get('input[data-v-4330c0b2]#languages_code').type('testla');
        cy.get('button[data-v-4330c0b2]').contains('Submit').click({ force: true });
        cy.get('.ant-message').contains('Language added successfully!');
        cy.get('[data-v-005bfc5a]').contains('Languages').click();
        cy.get('.ant-table-tbody > .ant-table-row > td').contains('Test lan').should('have.length', 1);
    });
    it('it should be throw eror with same language code', () => {
        cy.get('[data-v-005bfc5a]').contains('Settings').click();
        cy.get('[data-v-005bfc5a]').contains('Languages').click();
        cy.get('[data-v-02e4c64b]').contains('Add a new language').click();
        cy.get('input[data-v-4330c0b2]#languages_name').type('Test lan');
        cy.get('input[data-v-4330c0b2]#languages_code').type('testla');
        cy.get('button[data-v-4330c0b2]').contains('Submit').click({ force: true });
        cy.get('.ant-message').contains('This language already exists!');
    });
    it('it should be delete the Test lan succesfully', () => {
        cy.get('[data-v-005bfc5a]').contains('Settings').click();
        cy.get('[data-v-005bfc5a]').contains('Languages').click();
        cy.get('.ant-table-tbody > .ant-table-row > td')
            .contains('Test lan')
            .siblings()
            .contains('button', 'Delete')
            .click();
        cy.get('.ant-popover-buttons > button.ant-btn-primary').contains('Yes').click({ force: true });
        cy.get('.ant-message').contains('Language deleted successfully!');
    });
});
