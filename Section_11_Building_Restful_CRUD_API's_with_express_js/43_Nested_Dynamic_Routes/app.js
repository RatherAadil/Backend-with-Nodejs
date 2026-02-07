import express from 'express';

const app = express();

app.get('/blogs/:blogId/comments', (req, res) => {
  console.log('Comments');
  console.log(req.params);
  res.json(['nice', 'good', 'amazing']);
});
app.get('/blogs/:blogId/comments/:commentId', (req, res) => {
  console.log(req.params);
  res.json(req.params);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
