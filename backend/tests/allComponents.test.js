const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

describe('GET /api/computers/:id/components', () => {
  let computerId;

  beforeAll(async () => {
    // Create a computer
    const computerResponse = await request(app)
      .post('/api/computers')
      .send({ name: 'Computer with Components', description: 'Description' });
    
    computerId = computerResponse.body._id;

    // Add components to the computer
    await request(app)
      .post(`/api/computers/${computerId}/components`)
      .send({ name: 'RAM', description: '8GB DDR4', price: 80, user_name: 'User1' });

    await request(app)
      .post(`/api/computers/${computerId}/components`)
      .send({ name: 'SSD', description: '256GB SSD', price: 120, user_name: 'User2' });
  });

  afterAll(async () => {
    // Cleanup by deleting all computers and components manually
    await mongoose.connection.collection('computers').deleteMany({});
    await mongoose.connection.collection('components').deleteMany({});
    await mongoose.connection.close(); // Close the connection
  });

  it('should return all components for the specified computer', async () => {
    const res = await request(app).get(`/api/computers/${computerId}/components`);

    // Assert that the response status code is 200
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2); // We added 2 components
    expect(res.body[0].name).toBe('RAM');
    expect(res.body[1].name).toBe('SSD');
  });

  it('should return an empty array if no components exist for the computer', async () => {
    // Create a new computer with no components
    const newComputerResponse = await request(app)
      .post('/api/computers')
      .send({ name: 'Empty Computer', description: 'No components' });

    const newComputerId = newComputerResponse.body._id;
    
    // Fetch components for the new computer
    const res = await request(app).get(`/api/computers/${newComputerId}/components`);

    // Assert that the response status code is 200 and no components exist
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(0);
  });
});
