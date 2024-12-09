const request = require('supertest');
const mongoose = require('mongoose'); // Import mongoose to close the connection
const app = require('../server'); // Import the app

describe('POST /api/computers/:id/components', () => {
  let computerId; // Variable to store the created computer's ID

  beforeAll(async () => {
    // Before all tests, establish a connection to the database (test environment)
    await mongoose.connect(process.env.MONGO_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // After all tests, close the MongoDB connection
    await mongoose.connection.close();;
  });

  afterEach(async () => {
    // Cleanup - Ensure no data leaks into other tests by deleting created collections
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
    console.log('Cleaned up database after test');
  });

  it('should add a component to a specific computer', async () => {
    // Create a new computer
    const computer = await request(app)
      .post('/api/computers')
      .send({ name: 'Computer for Components', description: 'Description' });

    // Store the created computer ID
    computerId = computer.body._id;

    // Add a component to the created computer
    const res = await request(app)
      .post(`/api/computers/${computerId}/components`)
      .send({ name: 'GPU', description: 'RTX 3090', price: 1500, user_name: 'Test User' });

    // Assert the response
    expect(res.statusCode).toBe(201); // Ensure successful creation
    expect(res.body.name).toBe('GPU'); // Ensure the name matches the input data
  });
});
