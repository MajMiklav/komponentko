const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Component = require('../models/Component'); // Import the Component model

describe('GET /api/computers/average-price/all', () => {
    beforeAll(async () => {
        // Clear the database and insert test data
        await Component.deleteMany({});
        await Component.create([
            { name: 'CPU', description: 'Intel i9', price: 500, user_name: 'Test User', computerId: new mongoose.Types.ObjectId() },
            { name: 'GPU', description: 'RTX 3090', price: 1500, user_name: 'Test User', computerId: new mongoose.Types.ObjectId() },
        ]);
    });

    afterAll(async () => {
        // Cleanup the database and close the connection
        await mongoose.connection.close();
    });

    it('should return the average price of all components', async () => {
        const res = await request(app).get('/api/computers/average-price/all');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('averagePrice');
        expect(res.body.averagePrice).toBeGreaterThan(0); // Ensure a non-zero average if components exist
    });
});
