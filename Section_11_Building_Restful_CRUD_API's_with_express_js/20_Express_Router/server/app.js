import express from 'express';
import cors from 'cors';
import directoryRoutes from './routes/directoryRoutes.js';
import fileRoutes from './routes/fileRoutes.js';

const app = express();
const port = 4000;

app.use(express.json());

//Enabling CORS
app.use(cors());
app.use('/directory', directoryRoutes);
app.use('/files', fileRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
