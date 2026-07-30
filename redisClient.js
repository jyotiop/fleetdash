require('dotenv').config();
const Redis = require('ioredis');

const redisPublisher = new Redis(process.env.REDIS_URL);
const redisSubscriber = new Redis(process.env.REDIS_URL);

redisPublisher.on('connect', () => console.log('Connected to Redis Publisher!'));
redisSubscriber.on('connect', () => console.log('Connected to Redis Subscriber!'));

module.exports = { redisPublisher, redisSubscriber };