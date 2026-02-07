import express from 'express';

const app = express();
const port = 4000;

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/downlaod', (req, res) => {
  res.sendFile(`${import.meta.dirname}/reactjs.mp4`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
