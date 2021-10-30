const express = require('express');
const app = express();

const cmsAppRoutes = require('./routes/cms');
const webAppRoutes = require('./routes/web');

if (process.env.NODE_ENV !== 'test') {
    require('./mongo-connection');
}

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
