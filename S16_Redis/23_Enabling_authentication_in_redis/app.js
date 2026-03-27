import { createClient } from 'redis';

const redisClient = createClient();
await redisClient.connect();

await redisClient.auth({ password: 'admin@123' }); //helps to authenticate the password, to set a password check .md file

const result = await redisClient.ping();
console.log(result);

await redisClient.quit();
