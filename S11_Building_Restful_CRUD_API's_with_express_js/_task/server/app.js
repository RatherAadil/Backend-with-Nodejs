import express from 'express';
import { createWriteStream } from 'node:fs';
import { readdir, rename, rm } from 'node:fs/promises';
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
  const trashFiles = await readdir('./trash');
  res.json({ files, trashFiles });
});

//Create
app.post('/:filename', (req, res) => {
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
    // await rm(filePath);
    await rename(filePath, `./trash/${filename}`);
    res.json({ message: ` ${req.params.filename} moved to bin` });
    // const files = await readdir('./trash');
    // res.json(files);
  } catch (err) {
    res.status(404).json({
      message: `Error deleting file ${req.params.filename}`,
      error: err.message,
    });
  }
});

//TrashBin
app.put('/:filename', async (req, res) => {
  const { filename } = req.params;
  const oldFilePath = `./trash/${filename}`;
  const newFilePath = `./storage/${filename}`;
  // console.log({ filename, filePath });
  try {
    await rename(oldFilePath, newFilePath);
    res.json({ message: `File ${filename} restored successfully` });
  } catch (error) {
    res.status(404).json({
      message: `Error deleting file ${req.params.filename}`,
      error: err.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
