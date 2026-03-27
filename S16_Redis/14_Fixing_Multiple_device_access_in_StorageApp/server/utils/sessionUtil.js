import redisClient from '../config/redis.js';
const MAX_DEVICES = 2;

export const setUserSession = async ({
  id,
  rootDirId,
  name,
  email,
  picture,
  role,
}) => {
  const sessionId = crypto.randomUUID();
  const redisKey = `session:${sessionId}`;

  await redisClient.json.set(redisKey, '$', {
    userId: id,
    rootDirId,
    name,
    email,
    picture,
    role,
  });
  await redisClient.expire(redisKey, 60 * 60 * 24);
  return sessionId;
};

export const checkMaxSessionsLimit = async (userId) => {
  const allSessions = await redisClient.ft.search(
    'userIdIdx',
    `@userId:{${userId}}`,
  );

  if (allSessions.total >= MAX_DEVICES) {
    await redisClient.del(allSessions.documents[0].id);
  }
};

export const deleteUserSessions = async (userId) => {
  const allSessions = await redisClient.ft.search(
    'userIdIdx',
    `@userId:{${userId}}`,
    {
      RETURN: [],
    },
  );
  const allSessionKeys = allSessions.documents.map(({ id }) => id);
  await redisClient.del(allSessionKeys);
};
