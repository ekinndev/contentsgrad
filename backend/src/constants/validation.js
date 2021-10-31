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
    // console.log(fields, bodyData);
    const validationSchema = {};

    Object.keys(fields).forEach(field => {
        const { type, enumData } = fields[field];

        if (enumData) {
            validationSchema[field] = validationTypes[type](enumData);
        } else {
            validationSchema[field] = validationTypes[type]();
        }
    });

    const validator = new AsyncSchema(validationSchema);

    return validator
        .validate(bodyData)
        .then(() => {
            return true;
        })
        .catch(({ errors, fields }) => {
            return errors.map(error => error.message).join(', ');
        });
};

module.exports = validateContent;
