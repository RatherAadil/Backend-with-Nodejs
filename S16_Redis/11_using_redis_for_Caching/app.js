import express from 'express';
import { createClient } from 'redis';

const redisClient = await createClient().connect();

const app = express();
app.use(express.json());

app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  const redisKey = `users:${id}`;
  const cachedUser = await redisClient.json.get(redisKey);
  if (!cachedUser) {
    const userData = await getUser(id);
    await redisClient.json.set(redisKey, '$', userData);
    await redisClient.expire(redisKey, 60 * 60);
    return res.json(userData);
  }
  return res.json(cachedUser);
});

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  const redisKey = `users:${id}`;

  if (!userData) {
    return res.json({ message: 'User data not included' });
  }
  const updateRes = await updateUser(id, userData);
  if (updateRes === 'Could not update user') {
    return res.json({ message: updateRes });
  }
  await redisClient.del(redisKey);
  return res.json({ message: updateRes });
});

app.listen(4000, () => {
  console.log('Server started on 4000');
});

async function getUser(userId) {
  const response = await fetch(`https://fakestoreapi.com/users/${userId}`);
  return await response.json();
}
async function updateUser(userId, userData) {
  const response = await fetch(`https://fakestoreapi.com/users/${userId}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    return 'Could not update user';
  }
  return await response.json();
}
