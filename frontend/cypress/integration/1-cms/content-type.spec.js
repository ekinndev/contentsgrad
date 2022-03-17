describe('Content Types', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080');
        cy.get('#login_email').type('hello@test.com');
        cy.get('#login_password').type('hellofromotherside');
        cy.get('.ant-btn').click();
    });

    it('it should be create a content type succesfully', () => {
        cy.get('[data-v-005bfc5a]').contains('Settings').click();
        cy.get('[data-v-005bfc5a]').contains('Content Types').click();
        cy.get('[data-v-02e4c64b]').contains('Add a new content type').click();
        cy.get('#contentTypeForm_spaces').click({ force: true });
        cy.get('[role="option"]').first().click({ force: true });
        cy.get('#contentTypeForm_spaces .ant-select-search__field').blur();

        cy.get('button').contains('Add field').click({ force: true });
        cy.get('button').contains('Add field').click({ force: true });
        cy.get('button').contains('Add field').click({ force: true });
        cy.get('button').contains('Add field').click({ force: true });
        cy.get('button').contains('Add field').click({ force: true });
        cy.get('button').contains('Add field').click({ force: true });
        cy.get('button').contains('Add field').click({ force: true });
        cy.get('button').contains('Add field').click({ force: true });
        cy.get('button').contains('Add field').click({ force: true });
        cy.get('button').contains('Add field').click({ force: true });
        cy.get('button').contains('Add field').click({ force: true });

        cy.get('[data-cy=fieldType0]').click({ force: true });
        cy.get('[data-cy=fieldType1]').click({ force: true });
        cy.get('[data-cy=fieldType2]').click({ force: true });
        cy.get('[data-cy=fieldType3]').click({ force: true });
        cy.get('[data-cy=fieldType4]').click({ force: true });
        cy.get('[data-cy=fieldType5]').click({ force: true });
        cy.get('[data-cy=fieldType6]').click({ force: true });
        cy.get('[data-cy=fieldType7]').click({ force: true });
        cy.get('[data-cy=fieldType8]').click({ force: true });
        cy.get('[data-cy=fieldType9]').click({ force: true });
        cy.get('[data-cy=fieldType10]').click({ force: true });

        cy.get('[role="option"]').eq(2).click({ force: true });
        cy.get('[role="option"]').eq(15).click({ force: true });
        cy.get('[role="option"]').eq(28).click({ force: true });
        cy.get('[role="option"]').eq(41).click({ force: true });
        cy.get('[role="option"]').eq(54).click({ force: true });
        cy.get('[role="option"]').eq(67).click({ force: true });
        cy.get('[role="option"]').eq(80).click({ force: true });
        cy.get('[role="option"]').eq(93).click({ force: true });
        cy.get('[role="option"]').eq(106).click({ force: true });
        cy.get('[role="option"]').eq(119).click({ force: true });
        cy.get('[role="option"]').eq(132).click({ force: true });

        cy.get('#contentTypeForm_contentTypeName').type('Test Content Type');
        cy.get('[data-cy=fieldName0]').type('test1');
        cy.get('[data-cy=fieldName1]').type('test2');
        cy.get('[data-cy=fieldName2]').type('test3');
        cy.get('[data-cy=fieldName3]').type('test4');
        cy.get('[data-cy=fieldName4]').type('test5');
        cy.get('[data-cy=fieldName5]').type('test6');
        cy.get('[data-cy=fieldName6]').type('test7');
        cy.get('[data-cy=fieldName7]').type('test8');
        cy.get('[data-cy=fieldName8]').type('test9');
        cy.get('[data-cy=fieldName9]').type('test10');
        cy.get('[data-cy=fieldName10]').type('test11');
        cy.get('[data-cy=enum7]').type(`enum1{enter}enum2{enter}enum3`);
        cy.get('button[type=submit]').contains('Submit').click({ force: true });
        cy.get('.ant-message').contains('Content type added successfully!');
        cy.get('[data-v-005bfc5a]').contains('Content Types').click();
        cy.get('.ant-table-tbody > .ant-table-row > td').contains('Test content type').should('have.length', 1);
    });

    it('Duplicate ct should throw an error', () => {
        cy.get('[data-v-005bfc5a]').contains('Settings').click();
        cy.get('[data-v-005bfc5a]').contains('Content Types').click();
        cy.get('[data-v-02e4c64b]').contains('Add a new content type').click();
        cy.get('#contentTypeForm_spaces').click({ force: true });
        cy.get('[role="option"]').first().click({ force: true });
        cy.get('#contentTypeForm_spaces .ant-select-search__field').blur();

        cy.get('button').contains('Add field').click({ force: true });
        cy.get('button').contains('Add field').click({ force: true });
        cy.get('button').contains('Add field').click({ force: true });
        cy.get('button').contains('Add field').click({ force: true });
        cy.get('button').contains('Add field').click({ force: true });
        cy.get('button').contains('Add field').click({ force: true });
        cy.get('button').contains('Add field').click({ force: true });
        cy.get('button').contains('Add field').click({ force: true });
        cy.get('button').contains('Add field').click({ force: true });
        cy.get('button').contains('Add field').click({ force: true });
        cy.get('button').contains('Add field').click({ force: true });

        cy.get('[data-cy=fieldType0]').click({ force: true });
        cy.get('[data-cy=fieldType1]').click({ force: true });
        cy.get('[data-cy=fieldType2]').click({ force: true });
        cy.get('[data-cy=fieldType3]').click({ force: true });
        cy.get('[data-cy=fieldType4]').click({ force: true });
        cy.get('[data-cy=fieldType5]').click({ force: true });
        cy.get('[data-cy=fieldType6]').click({ force: true });
        cy.get('[data-cy=fieldType7]').click({ force: true });
        cy.get('[data-cy=fieldType8]').click({ force: true });
        cy.get('[data-cy=fieldType9]').click({ force: true });
        cy.get('[data-cy=fieldType10]').click({ force: true });

        cy.get('[role="option"]').eq(2).click({ force: true });
        cy.get('[role="option"]').eq(15).click({ force: true });
        cy.get('[role="option"]').eq(28).click({ force: true });
        cy.get('[role="option"]').eq(41).click({ force: true });
        cy.get('[role="option"]').eq(54).click({ force: true });
        cy.get('[role="option"]').eq(67).click({ force: true });
        cy.get('[role="option"]').eq(80).click({ force: true });
        cy.get('[role="option"]').eq(93).click({ force: true });
        cy.get('[role="option"]').eq(106).click({ force: true });
        cy.get('[role="option"]').eq(119).click({ force: true });
        cy.get('[role="option"]').eq(132).click({ force: true });

        cy.get('#contentTypeForm_contentTypeName').type('Test Content Type');
        cy.get('[data-cy=fieldName0]').type('test1');
        cy.get('[data-cy=fieldName1]').type('test2');
        cy.get('[data-cy=fieldName2]').type('test3');
        cy.get('[data-cy=fieldName3]').type('test4');
        cy.get('[data-cy=fieldName4]').type('test5');
        cy.get('[data-cy=fieldName5]').type('test6');
        cy.get('[data-cy=fieldName6]').type('test7');
        cy.get('[data-cy=fieldName7]').type('test8');
        cy.get('[data-cy=fieldName8]').type('test9');
        cy.get('[data-cy=fieldName9]').type('test10');
        cy.get('[data-cy=fieldName10]').type('test11');
        cy.get('[data-cy=enum7]').type(`enum1{enter}enum2{enter}enum3`);
        cy.get('button[type=submit]').contains('Submit').click({ force: true });
        cy.get('.ant-message').contains('This content type already exists!');
    });

    it('it should be delete the Test Content Type succesfully', () => {
        cy.get('[data-v-005bfc5a]').contains('Settings').click();
        cy.get('[data-v-005bfc5a]').contains('Content Types').click();
        cy.get('.ant-table-tbody > .ant-table-row > td')
            .contains('Test content type')
            .siblings()
            .contains('button', 'Delete')
            .click();
        cy.get('.ant-popover-buttons > button.ant-btn-primary').contains('Yes').click({ force: true });
        cy.get('.ant-message').contains('Content type deleted successfully!');
    });
});
