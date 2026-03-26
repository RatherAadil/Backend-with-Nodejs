import { createClient } from 'redis';

const redisClient = await createClient().on('error', (err) => {
  console.log(err);
  process.exit(1);
});
await redisClient.connect();

export default redisClient;
