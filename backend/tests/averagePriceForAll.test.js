const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); // Adjust this to your server file
const Component = require('../models/Component'); // Adjust the path if necessary

describe('GET /api/computers/average-price/all', () => {
    // Insert test data before each test
    beforeEach(async () => {
        // Clean up before inserting new data
        await Component.deleteMany({});

        // Insert test data: 2 components with known prices (500 and 1500)
        await Component.create([
            { name: 'CPU', description: 'Intel i9', price: 500, user_name: 'Test User', computerId: new mongoose.Types.ObjectId() },
            { name: 'GPU', description: 'RTX 3090', price: 1500, user_name: 'Test User', computerId: new mongoose.Types.ObjectId() }
        ]);
        console.log('Inserted 2 components');
    });

    it('should return the correct average price of all components', async () => {
        // Make the request to calculate the average price
        const res = await request(app).get('/api/computers/average-price/all');

        console.log('Average Price Response:', res.body);

        // Check if the response is correct
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('averagePrice');
        expect(res.body.averagePrice).toBeCloseTo(1000, 1); // Expected average: (500 + 1500) / 2 = 1000
    });

    afterEach(async () => {
        // Clean up after each test to ensure no leftover data
        await Component.deleteMany({});
        console.log('Cleaned up after test');
    });
});
