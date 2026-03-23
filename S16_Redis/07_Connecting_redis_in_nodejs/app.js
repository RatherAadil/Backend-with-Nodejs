import { createClient } from 'redis';

const redisClient = await createClient().connect();

// const result = await redisClient.set(
//   'storageapp:users:1',
//   'imratheraadil@gmail.com',
// );
// const result2 = await redisClient.get('storageapp:users:1:email');
// await redisClient.flushAll();
// console.log(result2);

const user = {
  name: 'aadil',
  age: 27,
  email: 'imratheraadil@gmail.com',
};

const result3 = await redisClient.set(
  'storageapp:users:1',
  JSON.stringify(user),
);
console.log(result3);
redisClient.destroy();
