import { createClient } from 'redis';

const client = createClient({
  url: 'redis://redis-16422.c330.asia-south1-1.gce.cloud.redislabs.com:16422',
  password: 'yxaHgRFmCRpNFcPySpl6Ijh5X5sCKBaM',
});

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

// await client.set('foo', 'bar');
const result = await client.keys('*');
console.log(result); // >>> bar
await client.quit();
