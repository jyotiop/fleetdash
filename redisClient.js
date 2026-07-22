const Redis = require('ioredis');

// Replace with JuRU's Redis connection URL, or defaults to local
const redisPublisher = new Redis(process.env.REDIS_URL="rediss://default:********@cuddly-jennet-162230.upstash.io:6379"  );
const redisSubscriber = new Redis(process.env.REDIS_URL="rediss://default:********@cuddly-jennet-162230.upstash.io:6379");

redisPublisher.on('connect', () => console.log('Connected to Redis Publisher!'));
redisSubscriber.on('connect', () => console.log('Connected to Redis Subscriber!'));

module.exports = { redisPublisher, redisSubscriber };

const { redisSubscriber } = require('./redisClient');

// Subscribe to the channel
redisSubscriber.subscribe('vehicle-telemetry', (err, count) => {
  console.log('Listening to vehicle-telemetry channel...');
});

// Print whenever a message arrives
redisSubscriber.on('message', (channel, message) => {
  console.log(`📥 Received from channel ${channel}:, JSON.parse(message)`);
});