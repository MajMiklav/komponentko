const request = require('supertest');
const app = require('../server');

describe('GET /api/computers/:id/components', () => {
  it('should return components for a specific computer', async () => {
    const computer = await request(app)
      .post('/api/computers')
      .send({ name: 'Component Computer', description: 'Description' });

    const res = await request(app).get(`/api/computers/${computer.body._id}/components`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
