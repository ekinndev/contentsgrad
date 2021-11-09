const express = require('express');

const cmsAppRoutes = require('./routes/cms');
const webAppRoutes = require('./routes/web');

const logger = require('morgan');
const cors = require('cors');

const helmet = require('helmet');
const compression = require('compression');

if (process.env.NODE_ENV !== 'test') {
    require('./mongo-connection');
}
const app = express();

app.use(helmet());
app.use(compression());

app.use(
    cors({
        origin: process.env.NODE_ENV === 'production' ? 'http://example.com' : true,
        credentials: true,
    }),
);
app.use(logger('dev'));

app.use(express.json());

app.use('/cms', cmsAppRoutes);
app.use('/web', webAppRoutes);

app.use('*', (req, res) => {
    res.status(404).send({ message: 'Invalid Route', status: 404 });
});

app.use((err, req, res, next) => {
    let status = err.status || 500;

    res.status(status).send(err);
});

module.exports = app;
