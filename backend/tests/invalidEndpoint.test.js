const request = require('supertest');
const app = require('../server');

describe('Invalid Endpoint', () => {
  it('should return 404 for an invalid endpoint', async () => {
    const res = await request(app).get('/api/invalid-endpoint');
    expect(res.statusCode).toBe(404);
  });
});
