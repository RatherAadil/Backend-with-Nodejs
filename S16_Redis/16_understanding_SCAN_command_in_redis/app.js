import { createClient } from 'redis';

const redisClient = createClient();
await redisClient.connect();

let cursor = '0';
do {
  const keys = await redisClient.scan(cursor, {
    MATCH: '*',
  });
  cursor = keys.cursor;
  console.log(keys);
} while (cursor !== '0');

await redisClient.quit();
