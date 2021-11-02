const express = require('express');
const router = express.Router();
const ContentType = require('../../models/content-type');
const Content = require('../../models/content');
const Language = require('../../models/language');
const Space = require('../../models/space');
const swaggerOptions = require('../../helpers/swagger');
const swaggerUi = require('swagger-ui-express');
const validationContent = require('../../constants/validation');

router.use('/swagger', swaggerUi.serve);
router.get('/swagger', swaggerUi.setup(swaggerOptions));

// Content Type Routes
/**
 * @swagger
 * /content-types/{id}:
 *   get:
 *     tags: [Content Type]
 *     summary: Retrieve a content type
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: _id.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Get a content type.
 *         content:
 *           application/json:
 *             schema:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         example: 617d676b64c8455326079eab
 *                       name:
 *                         example: a5
 *                       fields:
 *                          type: object
 *                          properties:
 *                                  update:
 *                                      example: Boolean
 *                                  title:
 *                                      example: String
 *                                  age:
 *                                      example: Number
 *                       createdAt:
 *                          example: 2021-10-30T15:40:27.895Z
 *                       updatedAt:
 *                          example: 2021-10-30T15:40:27.895Z
 *                       __v:
 *                          example: 0
 *       500:
 *         description: Error comes from mongoDB.
 *         content:
 *           application/json:
 *             schema:
 *                     type: object
 *                     properties:
 *                       stringValue:
 *                         example: 1
 *                       valueType:
 *                         example: string
 *                       kind:
 *                          example: ObjectId
 *                       value:
 *                          example: 1
 *                       path:
 *                          example: _id
 *                       reason:
 *                          type: object
 *                       name:
 *                          example: CastError
 *                       message:
 *                          example: Cast to ObjectId failed for value 1 (type string) at path _id for model contentType
 */
router.get('/content-types/:id', async (req, res, next) => {
    const id = req.params.id;

    const contentType = await ContentType.findOne({ _id: id });

    res.send(contentType);
});
/**
 * @swagger
 * /content-types/:
 *   get:
 *     tags: [Content Type]
 *     summary: Retrieve a list of all content types
 *     responses:
 *       200:
 *         description: Get all content types.
 *         content:
 *           application/json:
 *             schema:
 *                type: array
 *                items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         example: 617d676b64c8455326079eab
 *                       name:
 *                         example: a5
 *                       fields:
 *                          type: object
 *                          properties:
 *                                  update:
 *                                      example: Boolean
 *                                  title:
 *                                      example: String
 *                                  age:
 *                                      example: Number
 *                       createdAt:
 *                          example: 2021-10-30T15:40:27.895Z
 *                       updatedAt:
 *                          example: 2021-10-30T15:40:27.895Z
 *                       __v:
 *                          example: 0
 *
 */
router.get('/content-types', async (req, res, next) => {
    const datas = await ContentType.find();

    res.send(datas);
});
/**
 * @swagger
 * /content-types/{id}:
 *   put:
 *     tags: [Content Type]
 *     summary: Edit content type
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: _id.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The content type's name.
 *                 example: News
 *               fields:
 *                 type: object
 *                 description: The content type's fields.
 *                 example: {title: {type: rstring }, age: {type: float}, enum: {type: enum, enumData: ['enum4', 'enum5', 'enum6']}, json: {type: object}}
 *               spaces:
 *                 type: Array
 *                 example: [{_id: 617dc748cdbe3a44d4187b16}]
 *     responses:
 *       200:
 *         description: Edit a content type.
 *         content:
 *           application/json:
 *             schema:
 *                     type: object
 *                     properties:
 *                       acknowledged:
 *                         example: true
 *                       modifiedCount:
 *                         example: 1
 *                       upsertedId:
 *                          example: 0
 *                       upsertedCount:
 *                          example: 1
 *                       matchedCount:
 *                          example: 1
 *
 *       500:
 *         description: Error comes from mongoDB.
 *         content:
 *           application/json:
 *             schema:
 *                     type: object
 *                     properties:
 *                       stringValue:
 *                         example: 1
 *                       valueType:
 *                         example: string
 *                       kind:
 *                          example: ObjectId
 *                       value:
 *                          example: 1
 *                       path:
 *                          example: _id
 *                       reason:
 *                          type: object
 *                       name:
 *                          example: CastError
 *                       message:
 *                          example: Cast to ObjectId failed for value 1 (type string) at path _id for model contentType
 */
router.put('/content-types/:id', async (req, res, next) => {
    const id = req.params.id;

    const { name, fieldsDatas, spaces } = req.body;

    if (!name) return next({ message: 'Name must be required!', status: 400 });
    if (!fieldsDatas) return next({ message: 'FieldsDatas must be required!', status: 400 });
    if (fieldsDatas.length <= 0) return next({ message: 'FieldsDatas must contain at least one key!', status: 400 });

    const status = await ContentType.updateOne({ _id: id }, { name, fieldsDatas, spaces });

    res.send(status);
});
/**
 * @swagger
 * /content-types/{id}:
 *   delete:
 *     tags: [Content Type]
 *     summary: Delete content type
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: _id.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Delete a content type.
 *         content:
 *           application/json:
 *             schema:
 *                     type: object
 *                     properties:
 *                       deletedCount:
 *                         example: 1
 *
 *       500:
 *         description: Error comes from mongoDB.
 *         content:
 *           application/json:
 *             schema:
 *                     type: object
 *                     properties:
 *                       stringValue:
 *                         example: 1
 *                       valueType:
 *                         example: string
 *                       kind:
 *                          example: ObjectId
 *                       value:
 *                          example: 1
 *                       path:
 *                          example: _id
 *                       reason:
 *                          type: object
 *                       name:
 *                          example: CastError
 *                       message:
 *                          example: Cast to ObjectId failed for value 1 (type string) at path _id for model contentType
 */
router.delete('/content-types/:id', async (req, res, next) => {
    const id = req.params.id;

    const status = await ContentType.deleteOne({ _id: id });

    res.send(status);
});
/**
 * @swagger
 * /content-types/:
 *   post:
 *     tags: [Content Type]
 *     summary: Create a content type
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The content type's name.
 *                 example: News
 *               fields:
 *                 type: object
 *                 description: The content type's fields.
 *                 example: {title: {type: string }, age: {type: number}, enum: {type: enum, enumData: ['enum1', 'enum2', 'enum3']}, json: {type: object}}
 *               spaces:
 *                 type: Array
 *                 example: [{_id: 617dc748cdbe3a44d4187b16}]
 *     responses:
 *       201:
 *         description: Edit a content type.
 *         content:
 *           application/json:
 *             schema:
 *                     type: object
 *                     properties:
 *                       name:
 *                         example: a10
 *                       fields:
 *                         type: object
 *                       _id:
 *                          example: 617d9cc0fdd24549377cabc5
 *                       createdAt:
 *                          example: 2021-10-30T19:28:00.558Z
 *                       updatedAt:
 *                          example: 2021-10-30T19:28:00.558Z
 *                       __v:
 *                          0
 *
 *
 *       400:
 *         description: Validation Errors.
 *         content:
 *           application/json:
 *             schema:
 *                     type: object
 *                     properties:
 *                       message:
 *                         example: This content type already exists!
 *                       status:
 *                         example: 400
 *
 */
router.post('/content-types', async (req, res, next) => {
    const { name, fieldsDatas, spaces } = req.body;

    const isExist = await ContentType.exists({ name });

    if (isExist) return next({ message: 'This content type already exists!', status: 400 });

    const status = await ContentType.create({ name, fieldsDatas, spaces });

    res.status(201).send(status);
});
// Languages
/**
 * @swagger
 * /languages/:
 *   get:
 *     tags: [Language]
 *     summary: Retrieve a list of lanagues
 *     responses:
 *       200:
 *         description: Get all languages.
 *         content:
 *           application/json:
 *             schema:
 *                type: array
 *                items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         example: 617d676b64c8455326079eab
 *                       name:
 *                         example: a5
 *                       code:
 *                          example: tr
 *                       createdAt:
 *                          example: 2021-10-30T15:40:27.895Z
 *                       updatedAt:
 *                          example: 2021-10-30T15:40:27.895Z
 *                       __v:
 *                          example: 0
 *
 */
router.get('/languages', async (req, res, next) => {
    const languageAllData = await Language.find();

    res.send(languageAllData);
});

/**
 * @swagger
 * /languages/{id}:
 *   delete:
 *     tags: [Language]
 *     summary: Delete a language
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: _id.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Delete a language.
 *         content:
 *           application/json:
 *             schema:
 *                     type: object
 *                     properties:
 *                       deletedCount:
 *                         example: 1
 *
 *       500:
 *         description: Error comes from mongoDB.
 *         content:
 *           application/json:
 *             schema:
 *                     type: object
 *                     properties:
 *                       stringValue:
 *                         example: 1
 *                       valueType:
 *                         example: string
 *                       kind:
 *                          example: ObjectId
 *                       value:
 *                          example: 1
 *                       path:
 *                          example: _id
 *                       reason:
 *                          type: object
 *                       name:
 *                          example: CastError
 *                       message:
 *                          example: Cast to ObjectId failed for value 1 (type string) at path _id for model language
 */

router.delete('/languages/:id', async (req, res, next) => {
    const id = req.params.id;

    const status = await Language.deleteOne({ _id: id });

    res.send(status);
});
/**
 * @swagger
 * /languages/:
 *   post:
 *     tags: [Language]
 *     summary: Create a language
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of language.
 *                 example: Turkish
 *               code:
 *                 type: string
 *                 description: The code of language.
 *                 example: tr
 *     responses:
 *       201:
 *         description: Create a language.
 *         content:
 *           application/json:
 *             schema:
 *                     type: object
 *                     properties:
 *                       name:
 *                         example: Turkish
 *                       code:
 *                         example: tr
 *                       _id:
 *                          example: 617d9cc0fdd24549377cabc5
 *                       createdAt:
 *                          example: 2021-10-30T19:28:00.558Z
 *                       updatedAt:
 *                          example: 2021-10-30T19:28:00.558Z
 *                       __v:
 *                          0
 *
 *
 *       400:
 *         description: Validation Errors.
 *         content:
 *           application/json:
 *             schema:
 *                     type: object
 *                     properties:
 *                       message:
 *                         example: This language already exists!
 *                       status:
 *                         example: 400
 *
 */
router.post('/languages', async (req, res, next) => {
    const { name, code } = req.body;

    const isExist = await Language.exists({ code: code });

    if (isExist) return next({ message: 'This language already exists!', status: 400 });
    if (!name || !code) return next({ message: 'Name and code must be required!', status: 400 });

    const status = await Language.create({ name, code });

    res.status(201).send(status);
});
//
// Spaces
/**
 * @swagger
 * /spaces/:
 *   get:
 *     tags: [Space]
 *     summary: Retrieve a list of spaces
 *     responses:
 *       200:
 *         description: Get all spaces.
 *         content:
 *           application/json:
 *             schema:
 *                type: array
 *                items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         example: 617d676b64c8455326079eab
 *                       name:
 *                         example: Desktop
 *                       createdAt:
 *                          example: 2021-10-30T15:40:27.895Z
 *                       updatedAt:
 *                          example: 2021-10-30T15:40:27.895Z
 *                       __v:
 *                          example: 0
 *
 */
router.get('/spaces', async (req, res, next) => {
    const data = await Space.find();

    res.send(data);
});

/**
 * @swagger
 * /spaces/{id}:
 *   delete:
 *     tags: [Space]
 *     summary: Delete a space
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: _id.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Delete a space.
 *         content:
 *           application/json:
 *             schema:
 *                     type: object
 *                     properties:
 *                       deletedCount:
 *                         example: 1
 *
 *       500:
 *         description: Error comes from mongoDB.
 *         content:
 *           application/json:
 *             schema:
 *                     type: object
 *                     properties:
 *                       stringValue:
 *                         example: 1
 *                       valueType:
 *                         example: string
 *                       kind:
 *                          example: ObjectId
 *                       value:
 *                          example: 1
 *                       path:
 *                          example: _id
 *                       reason:
 *                          type: object
 *                       name:
 *                          example: CastError
 *                       message:
 *                          example: Cast to ObjectId failed for value 1 (type string) at path _id for model language
 */
router.delete('/spaces/:id', async (req, res, next) => {
    const id = req.params.id;

    const status = await Space.deleteOne({ _id: id });

    res.send(status);
});
/**
 * @swagger
 * /spaces/:
 *   post:
 *     tags: [Space]
 *     summary: Create a space
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of space
 *                 example: Desktop
 *     responses:
 *       201:
 *         description: Create a space.
 *         content:
 *           application/json:
 *             schema:
 *                     type: object
 *                     properties:
 *                       name:
 *                         example: Desktop
 *                       _id:
 *                          example: 617d9cc0fdd24549377cabc5
 *                       createdAt:
 *                          example: 2021-10-30T19:28:00.558Z
 *                       updatedAt:
 *                          example: 2021-10-30T19:28:00.558Z
 *                       __v:
 *                          0
 *
 *
 *       400:
 *         description: Validation Errors.
 *         content:
 *           application/json:
 *             schema:
 *                     type: object
 *                     properties:
 *                       message:
 *                         example: This space already exists!
 *                       status:
 *                         example: 400
 *
 */
router.post('/spaces', async (req, res, next) => {
    const { name } = req.body;

    const isExist = await Space.exists({ name: name });

    if (isExist) return next({ message: 'This space already exists!', status: 400 });
    if (!name) return next({ message: 'Name must be required!', status: 400 });

    const status = await Space.create({ name });

    res.status(201).send(status);
});
//

// Contents Routes
/**
 * @swagger
 * /contents/{contentTypeId}:
 *   get:
 *     tags: [Content]
 *     summary: Retrieve a list of contesnt based on contentTypeId
 *     parameters:
 *       - in: path
 *         name: contentTypeId
 *         required: true
 *         description: _id.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Get all contents based on contentTypeId.
 *         content:
 *           application/json:
 *             schema:
 *                type: array
 *                items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         example: 617d676b64c8455326079eab
 *                       contentType:
 *                         example: 617b15b566a7730a7299f820
 *                       data:
 *                          type: object
 *                          properties:
 *                              update:
 *                                  example: true
 *                       updatedAt:
 *                          example: 2021-10-30T15:40:27.895Z
 *                       createdAt:
 *                          example: 2021-10-30T15:40:27.895Z
 *                       __v:
 *                          example: 0
 *       500:
 *         description: Error comes from mongoDB.
 *         content:
 *           application/json:
 *             schema:
 *                     type: object
 *                     properties:
 *                       stringValue:
 *                         example: 1
 *                       valueType:
 *                         example: string
 *                       kind:
 *                          example: ObjectId
 *                       value:
 *                          example: 1
 *                       path:
 *                          example: _id
 *                       reason:
 *                          type: object
 *                       name:
 *                          example: CastError
 *                       message:
 *                          example: Cast to ObjectId failed for value 1 (type string) at path _id for model contentType
 */
router.get('/contents/:contentTypeId', async (req, res, next) => {
    const contentTypeId = req.params.contentTypeId;

    const datas = await Content.find({ contentType: contentTypeId });

    res.send(datas);
});

/**
 * @swagger
 * /contents/{id}:
 *   put:
 *     tags: [Content]
 *     summary: Edit a content
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: _id.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 description: The data of content.
 *                 example: { update: true, age: 18, title: Test }
 *     responses:
 *       200:
 *         description: Edit a content.
 *         content:
 *           application/json:
 *             schema:
 *                     type: object
 *                     properties:
 *                       acknowledged:
 *                         example: true
 *                       modifiedCount:
 *                         example: 1
 *                       upsertedId:
 *                          example: 0
 *                       upsertedCount:
 *                          example: 1
 *                       matchedCount:
 *                          example: 1
 *
 *       400:
 *         description: Validation error.
 *         content:
 *           application/json:
 *             schema:
 *                     type: object
 *                     properties:
 *                       status:
 *                         example: 400
 *                       message:
 *                         example: Key error
 *       500:
 *         description: Error comes from mongoDB.
 *         content:
 *           application/json:
 *             schema:
 *                     type: object
 *                     properties:
 *                       stringValue:
 *                         example: 1
 *                       valueType:
 *                         example: string
 *                       kind:
 *                          example: ObjectId
 *                       value:
 *                          example: 1
 *                       path:
 *                          example: _id
 *                       reason:
 *                          type: object
 *                       name:
 *                          example: CastError
 *                       message:
 *                          example: Cast to ObjectId failed for value 1 (type string) at path _id for model contentType
 */
router.put('/contents/:id', async (req, res, next) => {
    const body = req.body;

    const contentKeys = Object.keys(req.body.data);
    const id = req.params.id;

    const contentTypeIdData = await Content.findOne({ _id: id }).populate('contentType');

    const fields = contentTypeIdData.contentType.fieldsDatas.map(field => field.fieldName);

    const doesItInclude = contentKeys.every(key => fields.includes(key));

    if (!doesItInclude) return next({ status: 400, message: 'Key error' });

    const validationStatus = await validationContent(contentTypeIdData.contentType.fieldsDatas, req.body.data);

    if (validationStatus !== true) return next({ status: 400, message: validationStatus });

    const status = await Content.updateOne({ _id: id }, body);

    res.send(status);
});
/**
 * @swagger
 * /contents/{id}:
 *   delete:
 *     tags: [Content]
 *     summary: Delete a content
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: _id.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Delete a content.
 *         content:
 *           application/json:
 *             schema:
 *                     type: object
 *                     properties:
 *                       deletedCount:
 *                         example: 1
 *
 *       500:
 *         description: Error comes from mongoDB.
 *         content:
 *           application/json:
 *             schema:
 *                     type: object
 *                     properties:
 *                       stringValue:
 *                         example: 1
 *                       valueType:
 *                         example: string
 *                       kind:
 *                          example: ObjectId
 *                       value:
 *                          example: 1
 *                       path:
 *                          example: _id
 *                       reason:
 *                          type: object
 *                       name:
 *                          example: CastError
 *                       message:
 *                          example: Cast to ObjectId failed for value 1 (type string) at path _id for model contentType
 */
router.delete('/contents/:id', async (req, res, next) => {
    const id = req.params.id;

    const status = await Content.deleteOne({ _id: id });

    res.send(status);
});
/**
 * @swagger
 * /contents/{contentTypeId}:
 *   post:
 *     tags: [Content]
 *     summary: Create a content
 *     parameters:
 *       - in: path
 *         name: contentTypeId
 *         required: true
 *         description: _id.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 description: The data of content.
 *                 example: {update: true, title: Test, age: 18}
 *               language:
 *                  type: string
 *                  example: 617dc857edf7d4aa437b6988
 *     responses:
 *       201:
 *         description: Create a content.
 *         content:
 *           application/json:
 *             schema:
 *                     type: object
 *                     properties:
 *                       contentType:
 *                         example: 617b15b566a7730a7299f820
 *                       data:
 *                         type: object
 *                         properties:
 *                              update:
 *                                  example: true
 *                       _id:
 *                          example: 617da66adc84569af1e58dd0
 *                       createdAt:
 *                          example: 2021-10-30T20:09:14.267Z
 *                       updatedAt:
 *                          example: 2021-10-30T20:09:14.267Z
 *                       __v:
 *                          example: 0
 *
 *       400:
 *         description: Validation error.
 *         content:
 *           application/json:
 *             schema:
 *                     type: object
 *                     properties:
 *                       status:
 *                         example: 400
 *                       message:
 *                         example: Key error
 *       500:
 *         description: Error comes from mongoDB.
 *         content:
 *           application/json:
 *             schema:
 *                     type: object
 *                     properties:
 *                       stringValue:
 *                         example: 1
 *                       valueType:
 *                         example: string
 *                       kind:
 *                          example: ObjectId
 *                       value:
 *                          example: 1
 *                       path:
 *                          example: _id
 *                       reason:
 *                          type: object
 *                       name:
 *                          example: CastError
 *                       message:
 *
 */
router.post('/contents/:contentTypeId', async (req, res, next) => {
    const cTID = req.params.contentTypeId;

    const contentTypeIdData = await ContentType.findOne({ _id: cTID });

    const contentKeys = Object.keys(req.body.data);

    if (!contentKeys) return next({ status: 400, message: 'Missing fields' });

    const fields = contentTypeIdData.fieldsDatas.map(field => field.fieldName);

    const doesItInclude = contentKeys.every(key => fields.includes(key));

    if (!doesItInclude) return next({ status: 400, message: 'Key error' });

    const validationStatus = await validationContent(contentTypeIdData.fieldsDatas, req.body.data);

    if (validationStatus !== true) return next({ status: 400, message: validationStatus });

    const status = await Content.create({ ...req.body, contentType: cTID });

    res.status(201).send(status);
});
//

module.exports = router;
