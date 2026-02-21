import mongoose from 'mongoose';
import { User } from './userModel.js';

const result = await User.insertMany([
  { name: 'Zubair', age: 24, email: 'Zubair@abc.com' },
  { name: 'Yawar', age: 20, email: 'yawar@abc.com' },
  { name: 'Uzair', age: 18, email: 'Uzair@example.com' },
]);
// console.log(result);

await mongoose.disconnect();
