import express from 'express';

const app = express();

const port = 4000;

app.get(
  '/',
  (req, res, next) => {
    //Request Handler Middleware - 3 Params
    try {
      console.log('Running middleware 1');
      throw new Error('Error Occurred');
      res.write('Hello World! 1');
    } catch (err) {
      next(err);
    }
  },
  (req, res) => {
    //Request Handler Middleware - 2 Params
    console.log('Running middleware 2');
    res.end('Hello World! 2');
  },
  (err, req, res, next) => {
    //Error Handler Middleware - 4 Params
    console.log({ err: err.message });
    console.log('Running Error middleware');
    res.end('Error Found');
  },
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
