import express from 'express';

const app = express();
const PORT = 4000;

app.get(['/dir', '/folder', '/text'], (req, res) => {
  res.json('This works for /dir, /folder, and /text');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
