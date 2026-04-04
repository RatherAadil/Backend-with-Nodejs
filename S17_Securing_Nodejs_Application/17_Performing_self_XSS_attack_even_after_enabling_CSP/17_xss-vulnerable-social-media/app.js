import express from 'express';
import mongoose from 'mongoose';
import crypto from 'node:crypto';
import { readFile } from 'node:fs/promises';

const app = express();

app.use(express.json());

await mongoose.connect(
  'mongodb://admin:admin@localhost/socialApp?authSource=admin',
);

const postSchema = new mongoose.Schema({
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);

// Middleware
app.use(async (req, res, next) => {
  const nonce = crypto.randomBytes(16).toString('base64');
  if (req.headers.accept?.includes('text/html')) {
    res.setHeader(
      'Content-Security-Policy',
      `default-src 'self';\
      script-src 'self' 'nonce-${nonce}' 'report-sample';\
      style-src 'self';\
      connect-src 'self';\
      img-src 'self';\
      report-uri csp-voilations`,
    );
  }
  if (req.url === '/') {
    const indexHTMLFile = await readFile('./public/index.html', 'utf-8');
    res.send(indexHTMLFile.replace('${nonce}', nonce));
  }
  next();
});

app.use(express.static('./public'));

// Routes
app.get('/posts', async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.setHeader('Set-Cookie', 'loginSecret=hdxhw7yrx.k;');
  res.json(posts);
});

app.post('/posts', async (req, res) => {
  const post = new Post({ content: req.body.content });
  await post.save();
  res.status(201).json(post);
});

app.post(
  '/csp-voilations',
  express.json({ type: 'application/csp-report' }),
  (req, res) => {
    console.log(req.body);
    res.end('Hii');
  },
);

// Start server
app.listen(4000, () => console.log('Server running on http://localhost:4000'));
