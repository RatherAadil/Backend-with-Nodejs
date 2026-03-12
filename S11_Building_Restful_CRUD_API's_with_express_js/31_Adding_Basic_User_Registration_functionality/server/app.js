import express from 'express';
import cors from 'cors';
import directoryRoutes from './routes/directoryRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import userRoutes from './routes/userRoutes.js';
const app = express();
const port = 4000;

app.use(express.json());

//Enabling CORS
app.use(cors());
app.use('/directory', directoryRoutes);
app.use('/file', fileRoutes);
app.use('/user', userRoutes);
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: 'Something Went Wrong!' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
