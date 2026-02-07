import express from 'express';
import { readdir, rename } from 'node:fs/promises';
const app = express();
const port = 4000;

app.use(express.json());

//Enabling CORS
app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
  });
  next();
});

//Serving directory content
app.get('/', async (req, res) => {
  const files = await readdir('./storage');
  res.json(files);
});

//Read
app.get('/:filename', (req, res) => {
  const { filename } = req.params;
  if (req.query.action === 'download') {
    res.set('Content-Disposition', 'attachment');
  }
  res.sendFile(`${import.meta.dirname}/storage/${filename}`);
});

//Update
app.patch('/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    rename(`./storage/${filename}`, `./storage/${req.body.newFilename}`);
    res.json({ message: 'Renamed' });
  } catch (err) {
    res.status(500).json({ message: 'Error occured' });
  }
});

//Delete
app.delete('/:filename', async (req, res) => {
  const { filename } = req.params;
  const filePath = `./storage/${filename}`;
  try {
    await rm(filePath);
    res.json({ message: `File ${req.params.filename} deleted successfully` });
  } catch (err) {
    res.status(404).json({
      message: `Error deleting file ${req.params.filename}`,
      error: err.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
