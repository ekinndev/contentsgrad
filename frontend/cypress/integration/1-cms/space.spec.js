describe('Spaces', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080');
        cy.get('#login_email').type('hello@test.com');
        cy.get('#login_password').type('hellofromotherside');
        cy.get('.ant-btn').click();
    });

    it('it should be create a space succesfully', () => {
        cy.get('[data-v-005bfc5a]').contains('Settings').click();
        cy.get('[data-v-005bfc5a]').contains('Spaces').click();
        cy.get('[data-v-02e4c64b]').contains('Add a new space').click();
        cy.get('input[data-v-44559e47]').type('Test Space');
        cy.get('button[data-v-44559e47]').contains('Submit').click({ force: true });
        cy.get('.ant-message').contains('Space added successfully!');
        cy.get('[data-v-005bfc5a]').contains('Spaces').click();
        cy.get('.ant-table-tbody > .ant-table-row > td').contains('Test Space').should('have.length', 1);
    });
    it('it should be throw eror with same space name', () => {
        cy.get('[data-v-005bfc5a]').contains('Settings').click();
        cy.get('[data-v-005bfc5a]').contains('Spaces').click();
        cy.get('[data-v-02e4c64b]').contains('Add a new space').click();
        cy.get('input[data-v-44559e47]').type('Test Space');
        cy.get('button[data-v-44559e47]').contains('Submit').click({ force: true });
        cy.get('.ant-message').contains('This space already exists!');
    });
    it('it should be delete the Test Space succesfully', () => {
        cy.get('[data-v-005bfc5a]').contains('Settings').click();
        cy.get('[data-v-005bfc5a]').contains('Spaces').click();
        cy.get('.ant-table-tbody > .ant-table-row > td')
            .contains('Test Space')
            .siblings()
            .contains('button', 'Delete')
            .click();
        cy.get('.ant-popover-buttons > button.ant-btn-primary').contains('Yes').click({ force: true });
        cy.get('.ant-message').contains('Space deleted successfully!');
    });
});
