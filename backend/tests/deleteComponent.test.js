const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Computer = require('../models/Computer');

describe('DELETE /api/computers/:id', () => {
  let computerId;

  beforeAll(async () => {
    // Create a computer to test the deletion
    const res = await request(app)
      .post('/api/computers')
      .send({ name: 'Test Computer', description: 'Test Description' });

    computerId = res.body._id; // Save the computerId for later use
  });

  afterAll(async () => {
    // Clean up: delete the computer from the database after the tests
    await Computer.findByIdAndDelete(computerId);
    await mongoose.connection.close(); // Close the DB connection after tests
  });

  it('should delete a specific computer', async () => {
    const res = await request(app).delete(`/api/computers/${computerId}`);
    
    // Check if the response status is 200
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Computer deleted successfully');

    // Verify the computer is deleted (check if it no longer exists)
    const deletedComputer = await Computer.findById(computerId);
    expect(deletedComputer).toBeNull(); // It should be null after deletion
  });

  it('should return 404 if the computer does not exist', async () => {
    // Generate a fake ID that doesn't exist
    const fakeComputerId = new mongoose.Types.ObjectId();

    const res = await request(app).delete(`/api/computers/${fakeComputerId}`);
    
    // Check if the response status is 404 (not found)
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Computer not found');
  });
});
