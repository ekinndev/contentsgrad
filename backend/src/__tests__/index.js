const mongoose = require('mongoose');
const app = require('../app');
const request = require('supertest')(app);

const databaseName = 'jest';

async function dropAllCollections() {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName];
        try {
            await collection.drop();
        } catch (error) {
            // This error happens when you try to drop a collection that's already dropped. Happens infrequently.
            // Safe to ignore.
            if (error.message === 'ns not found') return;

            // This error happens when you use it.todo.
            // Safe to ignore.
            if (error.message.includes('a background operation is currently running')) return;

            console.log(error.message);
        }
    }
}
beforeAll(async () => {
    const url = `mongodb://127.0.0.1/${databaseName}`;
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await dropAllCollections();
    await mongoose.connection.close();
});

describe('Language', () => {
    let id;

    test('There should be a no longuage at db', async () => {
        const response = await request.get('/cms/languages/');

        expect(response.body.length).toBe(0);
    });
    test('Creating Language with empty body should return 400', async () => {
        const response = await request.post('/cms/languages');

        expect(response.status).toBe(400);
        expect(response.body.message).toBeTruthy();
    });

    test('Create Language', async () => {
        const data = {
            name: 'Turkish',
            code: 'tr',
        };

        const response = await request.post('/cms/languages').send(data);

        expect(response.status).toBe(201);
        expect(response.body._id).toBeTruthy();

        id = response.body._id;
    });

    test('Duplicate language code should return 400', async () => {
        const data = {
            name: 'Turkish',
            code: 'tr',
        };

        const response = await request.post('/cms/languages').send(data);

        expect(response.status).toBe(400);
        expect(response.body.message).toBeTruthy();
    });

    test('At least one language should be in db', async () => {
        const response = await request.get('/cms/languages/');

        expect(response.body.length).toBeGreaterThanOrEqual(1);
        expect(response.status).toBe(200);
    });

    test('Trying to delete an language with invalid id should return 500', async () => {
        const response = await request.delete('/cms/languages/1');

        expect(response.status).toBe(500);
    });

    test('Trying to delete an language with undefined id should return 400', async () => {
        const response = await request.delete('/cms/languages/');

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Invalid Route');
    });

    test('Trying to delete an language should return 200', async () => {
        const response = await request.delete(`/cms/languages/${id}`);

        expect(response.status).toBe(200);
    });
});
describe('Space', () => {
    let id;

    test('There should be a no longuage at db', async () => {
        const response = await request.get('/cms/spaces/');

        expect(response.body.length).toBe(0);
    });
    test('Creating a space with empty body should return 400', async () => {
        const response = await request.post('/cms/spaces');

        expect(response.status).toBe(400);
        expect(response.body.message).toBeTruthy();
    });

    test('Create A Space', async () => {
        const data = {
            name: 'Desktop',
        };

        const response = await request.post('/cms/spaces').send(data);

        expect(response.status).toBe(201);
        expect(response.body._id).toBeTruthy();

        id = response.body._id;
    });

    test('Duplicate space name should return 400', async () => {
        const data = {
            name: 'Desktop',
        };

        const response = await request.post('/cms/spaces').send(data);

        expect(response.status).toBe(400);
        expect(response.body.message).toBeTruthy();
    });

    test('At least one language should be in db', async () => {
        const response = await request.get('/cms/spaces/');

        expect(response.body.length).toBeGreaterThanOrEqual(1);
        expect(response.status).toBe(200);
    });

    test('Trying to delete an language with invalid id should return 500', async () => {
        const response = await request.delete('/cms/spaces/1');

        expect(response.status).toBe(500);
    });

    test('Trying to delete an space with undefined id should return 400', async () => {
        const response = await request.delete('/cms/spaces/');

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Invalid Route');
    });

    test('Trying to delete an language should return 200', async () => {
        const response = await request.delete(`/cms/spaces/${id}`);

        expect(response.status).toBe(200);
    });
});

describe('Content Type', () => {
    let id;
    let spaceId;

    beforeAll(async () => {
        const data = {
            name: 'Desktop',
        };

        const spaceResponse = await request.post('/cms/spaces').send(data);

        spaceId = spaceResponse.body._id;
    });

    test('There should be a no content type at db', async () => {
        const response = await request.get('/cms/content-types/').set('space', spaceId);

        expect(response.body.length).toBe(0);
    });

    test('Create content type with missing name should return 500', async () => {
        const data = {
            fields: { title: { type: 'string' }, age: { type: 'number' }, number: { type: 'number' } },
            spaces: [spaceId],
        };

        const response = await request.post('/cms/content-types/').set('space', spaceId).send(data);

        expect(response.status).toBe(500);
    });

    test('Create content type should return 201', async () => {
        const data = {
            name: 'test',
            fieldsDatas: [
                { fieldName: 'title', fieldType: 'string' },
                { fieldName: 'age', fieldType: 'number' },
                { fieldName: 'number', fieldType: 'number' },
            ],
            spaces: [spaceId],
        };

        const response = await request.post('/cms/content-types/').set('space', spaceId).send(data);

        expect(response.status).toBe(201);

        id = response.body._id;
    });

    test('Duplicate content type should return 400', async () => {
        const data = {
            name: 'test',
            fieldsDatas: [
                { fieldName: 'title', fieldType: 'string' },
                { fieldName: 'age', fieldType: 'number' },
                { fieldName: 'number', fieldType: 'number' },
            ],
            spaces: [spaceId],
        };

        const response = await request.post('/cms/content-types/').set('space', spaceId).send(data);

        expect(response.status).toBe(400);
    });

    test('At least one content type which name is test', async () => {
        const response = await request.get(`/cms/content-types/${id}`).set('space', spaceId);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('test');
        expect(response.body._id).toBeTruthy();
        expect(response.body.fieldsDatas).toBeTruthy();
    });

    test('Edit content type should return 200', async () => {
        const data = {
            name: 'test',
            fieldsDatas: [
                { fieldName: 'title', fieldType: 'string' },
                { fieldName: 'age', fieldType: 'number' },
                { fieldName: 'number', fieldType: 'string' },
            ],
            spaces: [spaceId],
        };

        const response = await request.put(`/cms/content-types/${id}`).set('space', spaceId).send(data);

        expect(response.status).toBe(200);
        expect(response.body.modifiedCount).toBe(1);
        expect(response.body.matchedCount).toBe(1);
    });

    test('Edit content type with missing name should return 400', async () => {
        const data = {
            fieldsDatas: [
                { fieldName: 'title', fieldType: 'string' },
                { fieldName: 'age', fieldType: 'number' },
                { fieldName: 'number', fieldType: 'string' },
            ],
            spaces: [spaceId],
        };

        const response = await request.put(`/cms/content-types/${id}`).set('space', spaceId).send(data);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Name must be required!');
    });
    test('Edit content type with missing fieldsDatas should return 400', async () => {
        const data = { name: 'test', spaces: [spaceId] };

        const response = await request.put(`/cms/content-types/${id}`).set('space', spaceId).send(data);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('FieldsDatas must be required!');
    });

    test('Content type fields datas should include at least one item', async () => {
        const data = { name: 'test', fieldsDatas: [], spaces: [spaceId] };

        const response = await request.put(`/cms/content-types/${id}`).set('space', spaceId).send(data);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('FieldsDatas must contain at least one key!');
    });

    test('Delete content type', async () => {
        const response = await request.delete(`/cms/content-types/${id}`).set('space', spaceId);

        expect(response.status).toBe(200);
        expect(response.body.deletedCount).toBe(1);
    });
});

describe('Content', () => {
    let id;
    let contentUuid;
    let contentTypeId;
    let contentTypeName;
    let spaceId;
    let languageId;

    beforeAll(async () => {
        const spaceData = {
            name: 'DesktopContent',
        };

        const spaceResponse = await request.post('/cms/spaces').send(spaceData);

        spaceId = spaceResponse.body._id;

        const contentTypedata = {
            name: 'test',
            fieldsDatas: [
                { fieldName: 'title', fieldType: 'string' },
                { fieldName: 'age', fieldType: 'number' },
                { fieldName: 'number', fieldType: 'number' },
            ],
            spaces: [spaceId],
        };

        const contentTypeResponse = await request
            .post('/cms/content-types/')
            .set('space', spaceId)
            .send(contentTypedata);

        contentTypeId = contentTypeResponse.body._id;
        contentTypeName = contentTypeResponse.body.name;

        const languageData = {
            name: 'Turkish',
            code: 'tr',
        };

        const languageResponse = await request.post('/cms/languages').send(languageData);

        languageId = languageResponse.body._id;
    });

    // test('There should be a no content type at db', async () => {
    //     const response2 = await request.get(`/cms/contents/${contentTypeId}?type=contentType`).set('space', spaceId);

    //     expect(response2.body.length).toBe(0);
    // });

    test('Create content with extra field should return 400', async () => {
        const data = {
            data: { title: 'String', age: 'Number', number: 'Number', space: 'Desktop', extraField: true },
            language: languageId,
        };

        const response = await request.post(`/cms/contents/${contentTypeId}`).set('space', spaceId).send(data);

        expect(response.body.message).toBe('Key error');
        expect(response.status).toBe(400);
    });
    test('Sucessfully create content should return 201', async () => {
        const data = { data: { title: 'aaaa', age: 1.2, number: 10 }, language: languageId, contentId: 'asasasas' };

        const response = await request.post(`/cms/contents/${contentTypeId}`).set('space', spaceId).send(data);

        expect(response.status).toBe(201);

        id = response.body._id;
        contentUuid = response.body.contentId;
    });

    test('Edit content should return 201', async () => {
        const data = { data: { title: 'hello', age: 1.3, number: 12 }, language: languageId };

        const response = await request
            .put(`/cms/contents/${contentUuid}?contentType=${contentTypeName}&language=${languageId}`)
            .set('space', spaceId)
            .send(data);

        expect(response.status).toBe(200);
        expect(response.body.modifiedCount).toBe(1);
        expect(response.body.matchedCount).toBe(1);
    });

    test('Delete content should return 200', async () => {
        const response = await request
            .delete(`/cms/contents/${id}?contentType=${contentTypeName}`)
            .set('space', spaceId);
        expect(response.status).toBe(200);
    });
});
