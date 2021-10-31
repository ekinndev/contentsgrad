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

    Object.keys(fields).forEach(field => {
        const { type, enumData } = fields[field];

        const typeLowerCase = type.toLowerCase();

        if (enumData) {
            validationSchema[field] = validationTypes[typeLowerCase](enumData);
        } else {
            validationSchema[field] = validationTypes[typeLowerCase]();
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
