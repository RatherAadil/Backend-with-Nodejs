import mongoose from 'mongoose';

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Database Connected');
  } catch (err) {
    console.log(err.message);
    console.log('Could not connect to Database');
    process.exit(1);
  }
}

process.on('SIGINT', async () => {
  await mongoose.disconnect();
  console.log('Clinet Disconnected');
  process.exit(0);
});
