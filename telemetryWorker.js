// telemetryWorker.js
const { parentPort, workerData } = require('worker_threads');
const { processVehicleAlerts } = require('./alertTriggers');

function processHeavyTelemetry(data) {
    const timestamp = data.timestamp || new Date().toISOString();
    return {
        vehicleId: data.vehicleId,
        lat: parseFloat(data.location?.lat),
        lng: parseFloat(data.location?.lng),
        timestamp: new Date(timestamp)
    };
}

try {
    const result = processHeavyTelemetry(workerData);
    result.isBreached = processVehicleAlerts(result); 
    parentPort.postMessage(result);
} catch (error) {
    throw new Error("Worker Math Failed: " + error.message);
}