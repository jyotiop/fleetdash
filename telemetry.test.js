// telemetry.test.js
// Mock ioredis before importing server to prevent network socket creation during testing
jest.mock('ioredis', () => {
  return jest.fn().mockImplementation(() => {
    return {
      publish: jest.fn().mockResolvedValue(1),
      subscribe: jest.fn().mockResolvedValue(1),
      on: jest.fn(),
      quit: jest.fn().mockResolvedValue(true),
      disconnect: jest.fn().mockResolvedValue(true),
    };
  });
});

// Mock FleetBucket model to avoid database operations during unit tests
jest.mock('./FleetBucket', () => {
  return {
    findOneAndUpdate: jest.fn().mockResolvedValue({}),
    schema: { index: jest.fn() }
  };
});

const request = require('supertest');
const mongoose = require('mongoose');
const { app, server } = require('./server'); // Import your Express server

// Clean up connections so Jest exits cleanly
afterAll(async () => {
    if (server.listening) {
        await new Promise((resolve) => server.close(resolve));
    }
    await mongoose.disconnect();
});

describe('FleetDash API Ingestion Engine', () => {
    
    it('should successfully receive vehicle data and return a 202 Success status', async () => {
        // 1. Create a fake GPS signal from a truck
        const fakeTruckPing = {
            vehicleId: "TRUCK-999",
            location: { lat: 28.5355, lng: 77.3910 }
        };

        // 2. Use Supertest to simulate sending this data to your POST route
        const response = await request(app)
            .post('/api/telemetry')
            .send(fakeTruckPing);

        // 3. Let Jest automatically check if the server responded correctly
        expect(response.status).toBe(202); // Expecting the "202 Accepted" status
        expect(response.body.status).toBe("Success"); // Expecting the success message
        expect(response.body.data.vehicleId).toBe("TRUCK-999"); // Did it parse the right ID?
    });

});