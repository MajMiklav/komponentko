const request = require('supertest');
const app = require('../server'); // Ensure the correct import of your Express app

describe('POST /api/computers', () => {
  it('should create a new computer', async () => {
    const newComputer = {
      name: 'Test Computer',
      description: 'Test Description'
    };

    // Make the request to your endpoint
    const res = await request(app)
      .post('/api/computers')
      .send(newComputer);

    // Assert that the status code is 201 (Created)
    expect(res.status).toBe(201);

    // Assert that the response contains the name sent in the request
    expect(res.body.name).toBe('Test Computer');

    // Optionally, check if the response also contains the description
    expect(res.body.description).toBe('Test Description');

    // You can also check for an `_id` field in the response to confirm it's in the database
    expect(res.body).toHaveProperty('_id');
  });
});
