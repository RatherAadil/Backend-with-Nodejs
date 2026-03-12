import mongoose from 'mongoose';

export async function connectMongoose() {
  try {
    await mongoose.connect('mongodb://aadil:aadil@localhost:27017/storageApp');
    console.log('Database Connected');
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
}

process.on('SIGINT', async () => {
  await mongoose.disconnect();
  console.log('Clinet Disconnected');
  process.exit(0);
});
