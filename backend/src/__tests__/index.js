const mongoose = require('mongoose');
const app = require('../app');
const request = require('supertest')(app);

const sum = (a, b) => {
    return a + b;
};

afterAll(async () => {
    await mongoose.connection.close();
});

test('3 plus 4 must be equal 7', () => {
    const result = sum(3, 4);

    expect(result).toBe(7);
});

test('3 plus 5 must not be equal 7', () => {
    const result = sum(3, 6);

    expect(result).not.toBe(7);
});

test('Will this work?', async () => {
    const response = await request.get('/web/me/');
    expect(response.text).toBe('hello world this is Ekin');
});
