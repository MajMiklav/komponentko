const request = require('supertest');
const mongoose = require('mongoose'); // Import mongoose to close the connection
const app = require('../server'); // Import the app

describe('POST /api/computers/:id/components', () => {
    afterAll(async () => {
        // Close the MongoDB connection after all tests
        await mongoose.connection.close();
    });

    it('should add a component to a specific computer', async () => {
        // Create a new computer
        const computer = await request(app)
            .post('/api/computers')
            .send({ name: 'Computer for Components', description: 'Description' });

        // Add a component to the computer
        const res = await request(app)
            .post(`/api/computers/${computer.body._id}/components`)
            .send({ name: 'GPU', description: 'RTX 3090', price: 1500, user_name: 'Test User' });

        // Assert the response
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe('GPU');
    });
});
