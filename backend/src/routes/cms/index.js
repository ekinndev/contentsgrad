const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const ContentType = require('../../models/content-type');
const Content = require('../../models/content');

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
    res.send('test');
});

router.delete('/languages/:id', (req, res, next) => {
    res.send('hello world this is Ekin');
});

router.post('/languages', async (req, res, next) => {
    res.send('hello world this is Ekin');
});

router.get('/spaces', async (req, res, next) => {
    res.send('test');
});

router.delete('/spaces/:id', (req, res, next) => {
    res.send('hello world this is Ekin');
});

router.post('/spaces', async (req, res, next) => {
    res.send('hello world this is Ekin');
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
