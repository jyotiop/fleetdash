const { checkGeofenceBreach } = require('./geofenceService');
// const { redisPublisher } = require('./redisClient'); // Uncomment when Redis is active

// 1. Define the restricted warehouse boundary
// Important: In Turf.js, the first and last coordinate must be EXACTLY the same to "close" the box!
const warehouseZone = [
    [77.3910, 28.5355], // Top-Left corner
    [77.3950, 28.5355], // Top-Right corner
    [77.3950, 28.5310], // Bottom-Right corner
    [77.3910, 28.5310], // Bottom-Left corner
    [77.3910, 28.5355]  // Back to Top-Left to close the polygon
];

/**
 
Processes incoming data and triggers an alert if the vehicle enters the zone.*/
function processVehicleAlerts(vehicleData) {
    // 2. Ask HuRU's code if the truck crossed the line
    const hasBreached = checkGeofenceBreach(vehicleData.lat, vehicleData.lng, warehouseZone);

    // 3. If the math says true, sound the alarm!
    if (hasBreached) {
        console.log(`🚨 ALERT: Vehicle ${vehicleData.vehicleId} entered the restricted warehouse zone!`);
    }

    return hasBreached;
}

module.exports = { processVehicleAlerts };