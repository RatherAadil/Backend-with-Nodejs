import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import directoryRoutes from './routes/directoryRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import guestRoutes from './routes/guestRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import checkAuth from './middlewares/authMiddleware.js';
import { connectDB } from './config/db.js';

await connectDB();
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());

app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL,
    credentials: true,
  }),
);

//User
app.use('/', userRoutes);
app.use('/auth', authRoutes);
app.use('/directory', checkAuth, directoryRoutes);
app.use('/file', checkAuth, fileRoutes);

//Admin
app.use('/', checkAuth, adminRoutes);

//Guest
app.use('/guest', guestRoutes);

app.use((err, req, res) => {
  console.log(err);
  res.status(err.status || 500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server Started`);
});
