import express from 'express';

const app = express();

const port = 4000;

app.get('/', (req, res) => {
  res.send('Hello World!');
  //   res.setHeader('Content-Type', 'text/html;charset=utf-8');
  //   res.end('Hello using end 😂');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
