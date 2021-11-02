const AsyncSchema = require('async-validator').default;

const validationTypes = {
    string: () => ({ type: 'string' }),
    rstring: () => ({ type: 'string' }),
    number: () => ({ type: 'number' }),
    boolean: () => ({ type: 'boolean' }),
    integer: () => ({ type: 'integer' }),
    float: () => ({ type: 'float' }),
    object: () => ({ type: 'object' }),
    enum: enumTypes => ({
        type: 'enum',
        enum: [...enumTypes],
    }),
    date: () => ({
        type: 'date',
    }),
    url: () => ({
        type: 'url',
    }),
    email: () => ({
        type: 'email',
    }),
};

const validateContent = (fields, bodyData) => {
    const validationSchema = {};

    fields.forEach(field => {
        const { fieldName, fieldType, enumData } = field;

        const typeLowerCase = fieldType.toLowerCase();

        if (enumData) {
            validationSchema[fieldName] = validationTypes[typeLowerCase](enumData);
        } else {
            validationSchema[fieldName] = validationTypes[typeLowerCase]();
        }
    });

    const validator = new AsyncSchema(validationSchema);

    return validator
        .validate(bodyData)
        .then(() => {
            return true;
        })
        .catch(({ errors }) => {
            return errors.map(error => error.message).join(', ');
        });
};

module.exports = validateContent;
