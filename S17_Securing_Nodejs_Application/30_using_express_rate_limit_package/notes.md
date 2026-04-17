With `express_rate_limit` npm package we can also use `express-rate-limit` to store the user rate limit information in the redis db, as the in Memory storage is volatile

```ts
import { rateLimit } from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import { createClient } from 'redis';

// Create a `node-redis` client
const client = createClient({
  // ... (see https://github.com/redis/node-redis/blob/master/docs/client-configuration.md)
});
// Then connect to the Redis server
await client.connect();

// Create and use the rate limiter
const limiter = rateLimit({
  // Rate limiter configuration
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers

  keyGenerator: (req) => {
    return req.user?.id || ipKeyGenerator(req.ip);
  },

  // Redis store configuration
  store: new RedisStore({
    sendCommand: (...args: string[]) => client.sendCommand(args),
  }),
});
app.use(limiter);
```
