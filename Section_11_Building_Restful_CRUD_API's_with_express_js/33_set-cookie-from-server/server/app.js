import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 4000;
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true,
  }),
);

app.get('/', (req, res) => {
  console.log(req.headers.cookie);
  console.log(req.cookies);
  // res.set({
  //   'Set-Cookie': [
  //     'name=aadil;SameSite=None;secure',
  //     'email=aadil@example.com;SameSite=None;secure',
  //     'password=hello;SameSite=None;secure',
  //   ],
  // });
  res.cookie('name', 'aadil', {
    sameSite: 'none',
    secure: true,
    maxAge: 3600,
  });
  res.cookie('age', '25', {
    sameSite: 'none',
    secure: true,
    maxAge: 3600,
  });
  res.json({ message: 'Hello World!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
