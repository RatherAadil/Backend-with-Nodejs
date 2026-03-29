import { createClient } from 'redis';

const redisClient = createClient().on('error', (err) => {
  console.log(err);
  process.exit(1);
});
await redisClient.connect();
await redisClient.auth({ password: process.env.REDIS_PASSWORD });
export default redisClient;
