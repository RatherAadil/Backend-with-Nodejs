import express from 'express';

const app = express();
const port = 4000;

app.get('/', (req, res) => {
  res.end('Home');
});
app.get('/login', (req, res) => {
  res.end('Logged In');
});

app.post('/', (req, res) => {
  res.end('POST Home Route');
});
app.put('/', (req, res) => {
  res.end('PUT Home Route');
});
app.delete('/', (req, res) => {
  res.end('DELETE Home Route');
});
app.patch('/', (req, res) => {
  res.end('PATCH Home Route');
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
