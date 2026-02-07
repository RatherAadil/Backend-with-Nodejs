import express from 'express';

const app = express();
const port = 4000;

// Parsin JSON data (custom Middleware)
// app.use((req, res, next) => {
//   console.log(req.url);
//   console.log(req.headers);
//   req.on('data', (chunk) => {
//     const reqBody = JSON.parse(chunk.toString());
//     req.body = reqBody;
//     next();
//   });
// });

app.use(express.json());

app.get('/', (req, res) => {
  res.end('Home');
});
app.get('/login', (req, res) => {
  res.end('Logged In');
});

app.post('/user', (req, res) => {
  console.log(req.body);
  res.end('POST Aadil');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
