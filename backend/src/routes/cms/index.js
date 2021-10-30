const express = require('express');
const router = express.Router();
const ContentType = require('../../models/content-type');
const Content = require('../../models/content');
const Language = require('../../models/language');
const Space = require('../../models/space');

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

    if (!name) return next({ message: 'Name must be required!', status: 400 });
    if (!fields) return next({ message: 'Fields must be required!', status: 400 });
    if (Object.keys(fields).length <= 0) return next({ message: 'Fields must contain at least one key!', status: 400 });

    const status = await ContentType.updateOne({ _id: id }, { name, fields });

    res.send(status);
});

router.delete('/content-types/:id', async (req, res, next) => {
    const id = req.params.id;

    const status = await ContentType.deleteOne({ _id: id });

    res.send(status);
});

router.post('/content-types', async (req, res, next) => {
    const { name, fields } = req.body;

    const isExists = await ContentType.exists({ name });

    if (isExists) return next({ message: 'This content type already exists!', status: 400 });

    const status = await ContentType.create({ name, fields });

    res.status(201).send(status);
});
// Languages
router.get('/languages', async (req, res, next) => {
    const languageAllData = await Language.find();

    res.send(languageAllData);
});

router.delete('/languages/:id', async (req, res, next) => {
    const id = req.params.id;

    const status = await Language.deleteOne({ _id: id });

    res.send(status);
});

router.post('/languages', async (req, res, next) => {
    const { name, code } = req.body;

    if (!name || !code) return next({ message: 'Name and code must be required!', status: 400 });

    const status = await Language.create({ name, code });

    res.status(201).send(status);
});
//
// Spaces
router.get('/spaces', async (req, res, next) => {
    const data = await Space.find();

    res.send(data);
});

router.delete('/spaces/:id', async (req, res, next) => {
    const id = req.params.id;

    const status = await Space.deleteOne({ _id: id });

    res.send(status);
});

router.post('/spaces', async (req, res, next) => {
    const { name } = req.body;

    if (!name) return next({ message: 'Name must be required!', status: 400 });

    const status = await Space.create({ name });

    res.status(201).send(status);
});
//

// Contents Routes
router.get('/contents/:contentTypeId', async (req, res, next) => {
    const contentTypeId = req.params.contentTypeId;

    const datas = await Content.find({ contentType: contentTypeId });

    res.send(datas);
});

router.put('/contents/:id', async (req, res, next) => {
    const body = req.body;

    const contentKeys = Object.keys(req.body);
    const id = req.params.id;

    const data = await Content.findOne({ _id: id }).populate('contentType');

    const fields = Object.fromEntries(data.contentType.fields);

    const doesItInclude = contentKeys.every(key => key in fields);

    if (!doesItInclude) return next({ status: 400, message: 'Key error' });

    const status = await Content.updateOne({ _id: id }, body);

    res.send(status);
});

router.delete('/contents/:id', async (req, res, next) => {
    const id = req.params.id;

    const status = await Content.deleteOne({ _id: id });

    res.send(status);
});

router.post('/contents/:contentTypeId', async (req, res, next) => {
    const cTID = req.params.contentTypeId;

    const contentTypeIdData = await ContentType.findOne({ _id: cTID });

    const contentKeys = Object.keys(req.body);
    const fields = Object.fromEntries(contentTypeIdData.fields);

    const doesItInclude = contentKeys.every(key => key in fields);

    if (!doesItInclude) return next({ status: 400, message: 'Key error' });

    const status = await Content.create({ ...req.body, contentType: cTID });

    res.status(201).send(status);
});
//

module.exports = router;
