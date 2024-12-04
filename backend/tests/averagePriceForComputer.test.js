const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Computer = require('../models/Computer'); // Import the Computer model
const Component = require('../models/Component'); // Import the Component model

describe('GET /api/computers/:id/average-price', () => {
  let computer;

  beforeAll(async () => {
    // Clear the database before the test starts
    await Computer.deleteMany({});
    await Component.deleteMany({});
    
    // Create a computer in the test database
    computer = await Computer.create({ name: 'Average Price Computer', description: 'Description' });

    // Add components to the computer
    await Component.create([
      { name: 'SSD', description: '1TB', price: 200, user_name: 'Test User', computerId: computer._id },
      { name: 'GPU', description: 'RTX 3080', price: 800, user_name: 'Test User', computerId: computer._id },
    ]);
  });

  afterAll(async () => {
    // Cleanup the database after the test
    await mongoose.connection.close();
  });

  it('should return the average price of components for a specific computer', async () => {
    // Make a request to get the average price of components for the created computer
    const res = await request(app).get(`/api/computers/${computer._id}/average-price`);
    
    // Check that the response has a status code of 200
    expect(res.statusCode).toBe(200);
    
    // Ensure the response contains an 'averagePrice' field
    expect(res.body).toHaveProperty('averagePrice');

    // Verify that the average price is correct: (200 + 800) / 2 = 500
    expect(res.body.averagePrice).toBe(500);
  });
});
