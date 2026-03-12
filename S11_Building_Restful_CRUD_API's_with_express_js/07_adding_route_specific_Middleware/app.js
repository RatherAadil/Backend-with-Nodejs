import express from 'express';

const app = express();
const port = 4000;

// app.use('/user', (req, res) => {
//   res.send('First Middleware');
// });
// app.use('/user/1', (req, res) => {
//   res.send('First Middleware');
// });

app.use(express.json());
app.use('/admin', (req, res, next) => {
  if (req.body.password === 'secret') {
    next();
  } else {
    res.send('Invalid credentails');
  }
});

app.post('/admin', (req, res) => {
  res.send('Hello admin');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
