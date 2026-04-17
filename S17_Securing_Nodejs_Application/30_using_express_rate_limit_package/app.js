import express from 'express';
import bcrypt from 'bcrypt';
import { rateLimit } from 'express-rate-limit';

const app = express();
const PORT = 4000;

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  // store: ... , // Redis, Memcached, etc. See below.
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  ipv6Subnet: 56,
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
app.use(globalLimiter);

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/register', limiter, async (req, res) => {
  bcrypt.hashSync('123456', 14);
  return res.json({ message: 'Registered Successfully' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Visit http://localhost:${PORT}`);
});
