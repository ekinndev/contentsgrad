const express = require('express');
const app = express();

const cmsAppRoutes = require('./routes/cms');
const webAppRoutes = require('./routes/web');

require('./mongo-connection');

app.use(express.json());

app.use('/cms', cmsAppRoutes);
app.use('/web', webAppRoutes);

app.get('*', (req, res) => {
    res.send('404');
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something broke!';

    res.status(status).send(err);
});

module.exports = app;
