// redisClient.js
const redis = require('@redis/client');

const redisClient = redis.createClient({
  url: 'redis://127.0.0.1:6379'
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

redisClient.on('ready', () => {
  console.log('Redis client is connected and ready');
});

(async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.error('Redis connection error:', err);
  }
})();

module.exports = redisClient;
