import redis from 'redis';
import RedisStore from 'connect-redis';  // Updated import

const redisClient = redis.createClient({
    host: 'localhost', // Redis host
    port: 6379 // Redis port
});

redisClient.on('connect', () => {
    console.log('Redis connected successfully!');
});

redisClient.on('error', (err) => {
    console.log('Redis error: ', err);
});

// Initialize RedisStore with Redis client
const store = RedisStore.create({ client: redisClient });

export { redisClient, store as RedisStore };
