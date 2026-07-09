import http from 'k6/http';
import { check, sleep } from 'k6';

// k6 options to ramp up traffic
export const options = {
    vus: 500, // Simulate 500 concurrent vehicles
    duration: '30s', // Run test for 30 seconds
};

export default function () {
    const url = 'http://localhost:3000/api/telemetry';
    
    const payload = JSON.stringify({
        vehicleId: `TRUCK-${Math.floor(Math.random() * 100)}`,
        timestamp: new Date().toISOString(),
        location: {
            lat: 28.6139 + Math.random() * 0.1,
            lng: 77.2090 + Math.random() * 0.1
        }
    });

    const params = {
        headers: { 'Content-Type': 'application/json' },
    };

    const res = http.post(url, payload, params);
    
    check(res, {
        'status is 202': (r) => r.status === 202,
    });

    sleep(0.1); // Small delay between coordinate transmissions
}