const { parentPort, workerData } = require('worker_threads');

function processHeavyTelemetry(data) {
    // Mimic coordinate validation or heavy parsing math
    const timestamp = data.timestamp || new Date().toISOString();
    
    return {
        vehicleId: data.vehicleId,
        lat: parseFloat(data.location?.lat),
        lng: parseFloat(data.location?.lng),
        timestamp: new Date(timestamp)
    };
}

// Process data and send it right back to the main server thread
const result = processHeavyTelemetry(workerData);
parentPort.postMessage(result);