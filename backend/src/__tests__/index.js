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

    test('At least one language should be in db', async () => {
        const response = await request.get('/cms/languages/');

        expect(response.body.length).toBeGreaterThanOrEqual(1);
        expect(response.status).toBe(200);
    });

    test('Trying to delete an language with invalid id should return 400', async () => {
        const response = await request.delete('/cms/languages/1');

        expect(response.status).toBe(400);
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

    test('Trying to delete an language with invalid id should return 400', async () => {
        const response = await request.delete('/cms/spaces/1');

        expect(response.status).toBe(400);
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
