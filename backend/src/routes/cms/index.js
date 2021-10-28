const express = require('express');
const router = express.Router();
const ContentType = require('../../models/content-type');
const Content = require('../../models/content');
const Language = require('../../models/language');
const Space = require('../../models/space');
const contentType = require('../../models/content-type');

// Content Type Routes
router.get('/content-types/:id', async (req, res, next) => {
    const id = req.params.id;

    const contentType = await ContentType.findOne({ _id: id });

    res.send(contentType);
});

router.get('/content-types', async (req, res, next) => {
    const datas = await ContentType.find();

    res.send(datas);
});

router.put('/content-types/:id', async (req, res, next) => {
    const id = req.params.id;
    const { name, fields } = req.body;

    const status = await contentType.findOneAndReplace({ _id: id }, { name, fields });

    res.send(status);
});

router.delete('/content-types/:id', async (req, res, next) => {
    const id = req.params.id;

    const status = await ContentType.findOneAndDelete({ _id: id });

    res.send(status);
});

router.post('/content-types', async (req, res, next) => {
    const { name, fields } = req.body;

    const isExists = await ContentType.exists({ name, fields });

    if (isExists) return next({ message: 'This content type already exists!', status: 400 });

    const status = await ContentType.create({ name, fields });

    res.send(status);
});

router.get('/languages', async (req, res, next) => {
    const languageAllData = await Language.find();

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
    const data = await Space.find();

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
