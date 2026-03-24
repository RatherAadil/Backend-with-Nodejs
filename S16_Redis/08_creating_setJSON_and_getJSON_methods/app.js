import redisClient from './redis.js';

const user = {
  username: 'Rather aadil',
  age: 27,
  email: 'imratheraadil@gmal.com',
};

// const result = await redisClient.setJSON('name', user);
const result = await redisClient.getJSON('name');
console.log(result);
// await redisClient.flushAll();
redisClient.destroy();
