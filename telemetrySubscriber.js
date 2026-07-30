const { redisSubscriber } = require('./redisClient');

// Subscribe to the channel
redisSubscriber.subscribe('vehicle-telemetry', (err, count) => {
  console.log('Listening to vehicle-telemetry channel...');
});

// Print whenever a message arrives
redisSubscriber.on('message', (channel, message) => {
  console.log(`📥 Received from channel ${channel}:, JSON.parse(message)`);
});