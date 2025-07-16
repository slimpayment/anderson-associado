import { createClient } from 'redis';
const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
  password: process.env.REDIS_PASSWORD,
});
console.log('############ Acessando LIB REDIS ############')

redisClient.on('error', (err) => console.error('Redis Client Error', err));

if (!redisClient.isOpen) {
  await redisClient.connect();
}

export default redisClient;
