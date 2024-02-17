const request = require('supertest');
const app = require('../v02-express/index'); 
let server;
const PORT = 5501

beforeAll((done) => {
    server = app.listen(PORT, () => {
        console.log('Server started on port ${PORT}');
        done();
    });
});

afterAll((done) => {
    server.close(done);
});

describe('API Tests', () => {
    it('should return status 200 - root URL', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
    });

    it('should return status 200 - /test URL', async () => {
        const response = await request(app).get('/test');
        expect(response.status).toBe(200);
    });

    it('should return status 200 - /test2/:id URL', async () => {
        const response = await request(app).get('/test2/123');
        expect(response.status).toBe(200);
    });

    it('should return status 200 - data to /add endpoint', async () => {
        const response = await request(app)
            .post('/add')
            .send({ title: 'Test', date: '2024-02-16' });
        expect(response.status).toBe(200);
    });
});
