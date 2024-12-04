const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
let mongoServer;

beforeAll(async () => {
    // Start MongoMemoryServer before all tests
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    // Connect mongoose to the in-memory MongoDB instance
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log('Connected to in-memory MongoDB');
});

afterAll(async () => {
    // Close mongoose connection and stop the in-memory server after tests
    await mongoose.connection.close();
    await mongoServer.stop();
    console.log('Disconnected from MongoDB');
});

afterEach(async () => {
    // Clear all collections after each test
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }
    console.log('Cleared collections');
});
