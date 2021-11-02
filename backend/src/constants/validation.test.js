const validateContent = require('./validation');
const dummyFields = {
    fieldsDatas: [
        { fieldName: 'title', fieldType: 'string' },
        { fieldName: 'content', fieldType: 'rstring' },
        { filedName: 'age', fieldType: 'number' },
        { fieldName: 'interest', fieldType: 'float' },
        { fieldName: 'email', fieldType: 'email' },
        { fieldName: 'url', fieldType: 'url' },
        { fieldName: 'bool', fieldType: 'boolean' },
        { fieldName: 'date', fieldType: 'date' },
        { fieldName: 'enum', fieldType: 'enum', enumData: ['enum1', 'enum2', 'enum3'] },
        { fieldlName: 'json', fieldType: 'object' },
    ],
};

test('Validate content successfully', () => {
    const dummyData = {
        data: {
            title: 'test',
            content: 'zz',
            age: 10,
            interest: 1.1,
            email: 'sa@sa.com',
            url: 'https://ekinn.dev',
            bool: false,
            date: '2021-10-31T14:00:58.093Z',
            enum: 'enum1',
            json: {},
        },
    };

    validateContent(dummyFields.fieldsDatas, dummyData.data).then(response => {
        expect(response).toBe(true);
    });
});

test('title should throw error', () => {
    const dummyData = {
        data: {
            title: 1,
            content: 'zz',
            age: 10,
            interest: 1.1,
            email: 'sa@sa.com',
            url: 'https://ekinn.dev',
            bool: false,
            date: '2021-10-31T14:00:58.093Z',
            enum: 'enum1',
            json: {},
        },
    };

    validateContent(dummyFields.fieldsDatas, dummyData.data).catch(response => {
        expect(response).toBeTruthy('title is not a string');
    });
});

test('title and interest should throw error', () => {
    const dummyData = {
        data: {
            title: 1,
            content: 'zz',
            age: 10,
            interest: 1,
            email: 'sa@sa.com',
            url: 'https://ekinn.dev',
            bool: false,
            date: '2021-10-31T14:00:58.093Z',
            enum: 'enum1',
            json: {},
        },
    };

    validateContent(dummyFields.fieldsDatas, dummyData.data).catch(response => {
        expect(response).toBeTruthy('title is not a string, interest is not a float');
    });
});
test('title, interest, enum should throw error', () => {
    const dummyData = {
        data: {
            title: 1,
            content: 'zz',
            age: 10,
            interest: 1,
            email: 'sa@sa.com',
            url: 'https://ekinn.dev',
            bool: false,
            date: '2021-10-31T14:00:58.093Z',
            enum: 'a',
            json: {},
        },
    };

    validateContent(dummyFields.fieldsDatas, dummyData.data).catch(response => {
        expect(response).toBeTruthy(
            'title is not a string, interest is not a float, enum must be one of enum1, enum2, enum3',
        );
    });
});

test('All error', () => {
    const dummyData = {
        data: {
            title: 1,
            content: 1,
            age: 'a',
            interest: 1,
            email: 'sasa.com',
            url: 'ekinn.dev',
            bool: 'false',
            date: 'xx',
            enum: 'a',
            json: 'a',
        },
    };

    validateContent(dummyFields.fieldsDatas, dummyData.data).catch(response => {
        expect(response).toBeTruthy(
            'title is not a string, content is not a string, age is not a number, interest is not a float, email is not a valid email, url is not a valid url, bool is not a boolean, date is not a date, enum must be one of enum1, enum2, enum3, json is not an object',
        );
    });
});
