// telemetry.test.js
const request = require('supertest');
const { app, server } = require('./server'); // Import your Express server

// This tells Jest to shut down the server after the test so it doesn't run forever
afterAll((done) => {
    server.close(done);
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