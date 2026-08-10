require('dotenv').config();
const Redis = require('ioredis');

const redisOptions = {
  retryStrategy(times) {
    if (times > 3) {
      console.log('⚠️ Redis: Max reconnection attempts reached. Stopping retries.');
      return null; // Stop retrying to prevent infinite logs
    }
    return 2000; // Wait 2 seconds between retries
  }
};

const redisPublisher = new Redis(process.env.REDIS_URL, redisOptions);
const redisSubscriber = new Redis(process.env.REDIS_URL, redisOptions);

// Prevent process crashes due to unhandled Redis connection errors
redisPublisher.on('error', (err) => console.log('⚠️ Redis Publisher Connection Error:', err.message));
redisSubscriber.on('error', (err) => console.log('⚠️ Redis Subscriber Connection Error:', err.message));

redisPublisher.on('connect', () => console.log('Connected to Redis Publisher!'));
redisSubscriber.on('connect', () => console.log('Connected to Redis Subscriber!'));

module.exports = { redisPublisher, redisSubscriber };