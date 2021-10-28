const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const ContentType = require('../../models/content-type');
const Content = require('../../models/content');
const Language = require('../../models/language');
const Space = require('../../models/space');

// Content Type Routes
router.get('/content-types/:id', (req, res, next) => {
    res.send('hello world this is Ekin');
});

router.get('/content-types', async (req, res, next) => {
    res.send('test');
});

router.put('/content-types/:id', (req, res, next) => {
    res.send('hello world this is Ekin');
});

router.delete('/content-types/:id', (req, res, next) => {
    res.send('hello world this is Ekin');
});

router.post('/content-types', async (req, res, next) => {
    res.send('hello world this is Ekin');
});

router.get('/languages', async (req, res, next) => {
    const languageAllData = await Language.findOne();

    res.send(languageAllData);
});

router.delete('/languages/:id', async (req, res, next) => {
    const id = req.params.id;

    const status = await Language.findOneAndDelete({ _id: id });

    res.send(status);
});

router.post('/languages', async (req, res, next) => {
    const { name, code } = req.body;

    const status = await Language.create({ name, code });

    res.send(status);
});

router.get('/spaces', async (req, res, next) => {
    const data = await Space.findOne();

    res.send(data);
});

router.delete('/spaces/:id', async (req, res, next) => {
    const id = req.params.id;

    const status = await Space.findOneAndDelete({ _id: id });

    res.send(status);
});

router.post('/spaces', async (req, res, next) => {
    const { name } = req.body;

    const status = await Space.create({ name });

    res.send(status);
});
//

// Contents Routes
router.get('/contents/:contentTypeId', (req, res, next) => {
    res.send('GET');
});

router.put('/contents/:contentTypeId/:id', (req, res, next) => {
    res.send('hello world this is Ekin');
});

router.delete('/contents/:contentTypeId/:id', (req, res, next) => {
    res.send('hello world this is Ekin');
});

router.post('/contents/:contentTypeId', async (req, res, next) => {
    res.send('hello world this is Ekin');
});
//

module.exports = router;
