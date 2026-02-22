import mongoose from 'mongoose';
import { User } from './userModel.js';

await User.init();
const user = await User.insertOne({
  name: 'Zubair',
  age: 24,
  email: 'ratheraadil@gmail.com',
});
console.log(user);
await mongoose.disconnect();
