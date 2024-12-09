const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Computer = require('../models/Computer');
const Component = require('../models/Component');

describe('GET /api/computers/:id/average-price', () => {
  let computer;

  beforeEach(async () => {
    // Clear the database before each test
    await Computer.deleteMany({});
    await Component.deleteMany({});

    // Create a computer and add components to it
    computer = await Computer.create({ name: 'Test Computer', description: 'Description' });

    await Component.create([
      { name: 'SSD', description: '1TB', price: 200, user_name: 'Test User', computerId: computer._id },
      { name: 'GPU', description: 'RTX 3080', price: 800, user_name: 'Test User', computerId: computer._id },
    ]);
  });

  afterEach(async () => {
    // Clean up collections after each test to ensure no leftover data
    await Component.deleteMany({});
    await Computer.deleteMany({});
  });

  afterAll(async () => {
    // Ensure proper cleanup of database
    await mongoose.connection.close();
  });

  it('should return the average price of components for a specific computer', async () => {
    const res = await request(app).get(`/api/computers/${computer._id}/average-price`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('averagePrice');
    expect(res.body.averagePrice).toBe(500); // (200 + 800) / 2 = 500
  });
});
