const request = require('supertest');
const app = require('../server');

describe('GET /api/computers', () => {
  it('should return all computers', async () => {
    const res = await request(app).get('/api/computers');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
