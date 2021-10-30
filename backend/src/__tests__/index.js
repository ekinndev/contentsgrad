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
            name: 'Turkish',
            code: 'tr',
        };

        const response = await request.post('/cms/spaces').send(data);

        expect(response.status).toBe(201);
        expect(response.body._id).toBeTruthy();

        id = response.body._id;
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

    test('There should be a no content type at db', async () => {
        const response = await request.get('/cms/content-types/');

        expect(response.body.length).toBe(0);
    });

    test('Create content type with missing name should return 500', async () => {
        const data = { fields: { title: 'String', age: 'Number', number: 'Number' } };

        const response = await request.post('/cms/content-types/').send(data);

        expect(response.status).toBe(500);
    });

    test('Create content type should return 201', async () => {
        const data = { name: 'test', fields: { title: 'String', age: 'Number', number: 'Number' } };

        const response = await request.post('/cms/content-types/').send(data);

        expect(response.status).toBe(201);

        id = response.body._id;
    });

    test('Duplicate content type should return 400', async () => {
        const data = { name: 'test', fields: { title: 'String', age: 'Number', number: 'Number' } };

        const response = await request.post('/cms/content-types/').send(data);

        expect(response.status).toBe(400);
    });

    test('At least one content type which name is test', async () => {
        const response = await request.get(`/cms/content-types/${id}`);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('test');
        expect(response.body._id).toBeTruthy();
        expect(response.body.fields).toBeTruthy();
    });

    test('Edit content type should return 200', async () => {
        const data = { name: 'test', fields: { title: 'String', age: 'Number', number: 'Number', address: 'String' } };

        const response = await request.put(`/cms/content-types/${id}`).send(data);

        expect(response.status).toBe(200);
        expect(response.body.modifiedCount).toBe(1);
        expect(response.body.matchedCount).toBe(1);
    });

    test('Edit content type with missing name should return 400', async () => {
        const data = { fields: { title: 'String', age: 'Number', number: 'Number', address: 'String' } };

        const response = await request.put(`/cms/content-types/${id}`).send(data);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Name must be required!');
    });
    test('Edit content type with missing fields should return 400', async () => {
        const data = { name: 'test' };

        const response = await request.put(`/cms/content-types/${id}`).send(data);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Fields must be required!');
    });

    test('Content type fields should include at least one key', async () => {
        const data = { name: 'test', fields: {} };

        const response = await request.put(`/cms/content-types/${id}`).send(data);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Fields must contain at least one key!');
    });

    test('Delete content type', async () => {
        const response = await request.delete(`/cms/content-types/${id}`);

        expect(response.status).toBe(200);
        expect(response.body.deletedCount).toBe(1);
    });
});

describe('Content', () => {
    let id;
    let contentTypeId;

    test('There should be a no content type at db', async () => {
        const data = { name: 'test', fields: { title: 'String', age: 'Number', number: 'Number' } };

        const response = await request.post('/cms/content-types/').send(data);

        contentTypeId = response.body._id;

        const response2 = await request.get(`/cms/contents/${contentTypeId}`);

        expect(response2.body.length).toBe(0);
    });

    test('Create content with extra field should return 400', async () => {
        const data = { data: { title: 'String', age: 'Number', number: 'Number', space: 'Desktop', extraField: true } };

        const response = await request.post(`/cms/contents/${contentTypeId}`).send(data);

        expect(response.body.message).toBe('Key error');
        expect(response.status).toBe(400);
    });
    test('Sucessfully create content should return 201', async () => {
        const data = { data: { title: 'String', age: 'Number', number: 'Number' } };

        const response = await request.post(`/cms/contents/${contentTypeId}`).send(data);

        expect(response.status).toBe(201);

        id = response.body._id;
    });

    test('Edit content should return 201', async () => {
        const data = { data: { title: 'hello', age: 'hello', number: 'hello' } };

        const response = await request.put(`/cms/contents/${id}`).send(data);

        expect(response.status).toBe(200);
        expect(response.body.modifiedCount).toBe(1);
        expect(response.body.matchedCount).toBe(1);
    });

    test('Delete content should return 200', async () => {
        const response = await request.delete(`/cms/contents/${id}`);

        expect(response.status).toBe(200);
    });
});
