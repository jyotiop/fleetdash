// 1. IMPORT at the top of telemetryWorker.js
const { parentPort } = require('worker_threads');
const { publishTelemetry } = require('./telemetryPublisher'); 

// Listen for messages coming from the main thread
parentPort.on('message', (rawData) => {
  // Step A: Parse the incoming data
  const parsedData = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;

  // Step B: 👈 THIS IS CALLING IT!
  // Send the parsed vehicle coordinates straight to Redis Pub/Sub:
  publishTelemetry(parsedData); 

  // Step C: Send parsed data back to the main thread for MongoDB saving
  parentPort.postMessage(parsedData);
});

// telemetryPublisher.js
const { redisPublisher } = require('./redisClient');

/**
 
Publishes parsed vehicle telemetry data to Redis Pub/Sub channel
@param {Object} data - The parsed vehicle telemetry object*/
function publishTelemetry(data) {
  try {
    // Convert object to JSON string because Redis channels send text/buffers
    const payload = JSON.stringify(data);

    // Publish to the channel named 'vehicle-telemetry'
    redisPublisher.publish('vehicle-telemetry', payload);
    console.log(`📡 [Redis Pub] Telemetry published for Vehicle: ${data.vehicleId}`);
  } catch (error) {
    console.error('❌ Failed to publish to Redis:', error);
  }


    module.exports = { publishTelemetry };
}