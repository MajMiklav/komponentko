// deleteComputer.test.js
const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Computer = require('../models/Computer');

describe('DELETE /api/computers/:id', () => {
  let computerId;

  beforeAll(async () => {
    // Set up test data: create a computer
    const newComputer = await request(app)
      .post('/api/computers')
      .send({ name: 'Test Computer', description: 'Test Description' });

    computerId = newComputer.body._id;
  });

  afterAll(async () => {
    // Clean up database: Delete the created computer
    await Computer.findByIdAndDelete(computerId);
    await mongoose.connection.close(); // Ensure the connection is closed after tests
  });

  it('should delete a specific computer', async () => {
    const res = await request(app).delete(`/api/computers/${computerId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Computer deleted successfully');
  });
});
