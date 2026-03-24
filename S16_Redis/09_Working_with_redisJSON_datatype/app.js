import { createClient } from 'redis';

const redisClient = await createClient()
  .on('error', (err) => console.log('Redis Client Error', err))
  .connect();

const user = {
  username: 'Rather aadil',
  age: 25,
  email: 'imratheraadil@gmal.com',
};

// const result = await redisClient.json.set(
//   'user:1',
//   '$.username',
//   'Zubair ahmad rather',
// );
// const result = await redisClient.json.set('user:1', '$', user);
// const result = await redisClient.json.del('user:1', {
//   path: '$.age',
// });
const result = await redisClient.json.get('user:1', { path: '$.username' });
console.log(result);
// await redisClient.flushAll();
redisClient.destroy();
