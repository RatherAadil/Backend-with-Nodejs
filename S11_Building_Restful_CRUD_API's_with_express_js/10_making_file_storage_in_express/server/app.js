import express from 'express';
import { createWriteStream } from 'node:fs';
import { readdir } from 'node:fs/promises';
const app = express();
const port = 4000;

//Enabling CORS
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

//Serving File
app.use((req, res, next) => {
  if (req.query.action === 'download') {
    res.set('Content-Disposition', 'attachment');
  }
  const serveStatic = express.static('storage');
  serveStatic(req, res, next);
});
app.get('/', async (req, res) => {
  const files = await readdir('./storage');
  res.json(files);
});

app.post('/', (req, res) => {
  console.log(req.headers.filename);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
