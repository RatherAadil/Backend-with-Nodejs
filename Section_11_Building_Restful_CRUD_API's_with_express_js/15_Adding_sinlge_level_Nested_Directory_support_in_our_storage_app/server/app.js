import express from 'express';
import { createWriteStream } from 'node:fs';
import { readdir, rename, rm, stat } from 'node:fs/promises';
import cors from 'cors';
const app = express();
const port = 4000;

app.use(express.json());

//Enabling CORS
app.use(cors());

//Serving directory content
app.get('/directory{/:dirname}', async (req, res) => {
  const { dirname } = req.params;
  console.log(dirname);
  const fullDirPath = `./storage/${dirname ? dirname : ''}`;
  const filesList = await readdir(fullDirPath);
  const resData = [];
  for (const item of filesList) {
    const stats = await stat(`${fullDirPath}/${item}`);
    resData.push({
      name: item,
      isDirectory: stats.isDirectory(),
    });
  }
  res.json(resData);
});

//Create
app.post('/files/:filename', (req, res) => {
  try {
    const writeStream = createWriteStream('./storage/' + req.params.filename);
    req.pipe(writeStream);
    req.on('end', () => {
      res.status(200).json({ message: `File uploaded successfully` });
    });
  } catch (error) {
    res.status(500).json({
      message: `Error uploading file`,
      error: error.message,
    });
  }
});

//Read
app.get('/files/:filename', (req, res) => {
  const { filename } = req.params;
  if (req.query.action === 'download') {
    res.set('Content-Disposition', 'attachment');
  }
  res.sendFile(`${import.meta.dirname}/storage/${filename}`);
});

//Update
app.patch('/files/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    rename(`./storage/${filename}`, `./storage/${req.body.newFilename}`);
    res.json({ message: 'Renamed' });
  } catch (err) {
    res.status(500).json({ message: 'Error occured' });
  }
});

//Delete
app.delete('/files/:filename', async (req, res) => {
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
