import { createClient } from 'redis';

const redisClient = await createClient()
  .on('error', (err) => console.log('Redis Client Error', err))
  .connect();

redisClient.setJSON = async function (key, value) {
  return await this.set(key, JSON.stringify(value));
};
redisClient.getJSON = async function (key) {
  const data = await this.get(key);
  return JSON.parse(data);
};

export default redisClient;
