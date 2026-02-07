import express from 'express';

const app = express();

// app.get(/^\/(\d+)$/, (req, res) => {
//   res.json({ message: 'Hello world' });
// });
app.get('/directory|folder', (req, res) => {
  res.json({ message: 'Hello Directory' });
});
app.get('/:id([0-9])', (req, res) => {
  res.json({ message: 'Hello number' });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
