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