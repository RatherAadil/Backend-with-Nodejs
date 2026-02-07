import express from 'express';
import { createWriteStream } from 'node:fs';
import { mkdir, readdir, rename, rm, rmdir, stat } from 'node:fs/promises';
import cors from 'cors';
const app = express();
const port = 4000;

app.use(express.json());

//Enabling CORS
app.use(cors());

//Serving directory content
app.get('/directory{/*dirname}', async (req, res) => {
  const { dirname } = req.params;
  const dirPath = dirname?.join('/');
  const fullDirPath = `./storage/${dirPath ? dirPath : ''}`;
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

//create Directory
app.post('/directory{/*dirname}', async (req, res) => {
  try {
    const { dirname } = req.params;
    const dirCreationPath = dirname?.join('/');
    await mkdir(`./storage/${dirCreationPath}`);
    res.json({ message: 'Folder created successfully' });
  } catch (err) {
    res.json({ err: err.message });
  }
});

//Create
app.post('/files{/*filename}', (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = filename?.join('/');
    const writeStream = createWriteStream(`./storage/${filePath}`);
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
app.get('/files/{*path}', (req, res) => {
  const { path } = req.params;
  const filepath = path.join('/');
  if (req.query.action === 'download') {
    res.set('Content-Disposition', 'attachment');
  }
  res.sendFile(`${import.meta.dirname}/storage/${filepath}`);
});

//Update
app.patch('/files/{*filename}', async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = filename?.join('/');
    rename(`./storage/${filePath}`, `./storage/${req.body.newFilename}`);
    res.json({ message: 'Renamed' });
  } catch (err) {
    res.status(500).json({ message: 'Error occured' });
  }
});

//Delete
app.delete('/files{/*filename}', async (req, res) => {
  const { filename } = req.params;
  const filePath = `./storage/${filename?.join('/')}`;
  console.log(filePath);
  try {
    await rm(filePath, { recursive: true });
    res.json({ message: `File ${filePath} deleted successfully` });
  } catch (err) {
    res.status(404).json({
      message: `Error deleting file ${filePath}`,
      error: err.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
