import { createClient } from 'redis';

const redisClient = createClient();
await redisClient.connect();

// await redisClient.publish('node_channel', 'Hello from publisher');

// await redisClient.subscribe('node_channel', (message) => {
//   console.log('Received:', message);
// });

setTimeout(async () => {
  await redisClient.unsubscribe('node_channel');
}, 5000);

// await redisClient.quit();
