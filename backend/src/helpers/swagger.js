const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ContentsGrad Express API with Swagger',
            version: '0.1.0',
            license: {
                name: 'MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
            contact: {
                name: 'Ekin Abalıoğlu',
                url: 'https://ekinn.dev',
                email: 'me@ekinn.dev',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000/cms/',
            },
        ],
    },
    apis: ['./src/routes/**/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
