import express from 'express';

const app = express();
const port = 4000;

app.get('/', (req, res) => {
  // res.setHeader('Content-Type', 'application/json');
  // res.send(JSON.stringify({ message: 'Hello world' }));
  res.status(201).json({ message: 'Hello world' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
