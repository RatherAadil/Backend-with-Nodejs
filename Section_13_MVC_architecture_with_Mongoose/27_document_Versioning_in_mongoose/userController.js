import mongoose from 'mongoose';
import { User } from './userModel.js';

const user1 = await User.findOne({ email: 'ratheraadil@gmail.com' });
const user2 = await User.findOne({ email: 'ratheraadil@gmail.com' });

console.log(user1.__v);
user1.balance += 500;
await user1.save();
console.log(user1.__v);

console.log(user2.__v);
user2.balance += 1000;
await user2.save();
console.log(user2.__v);

await mongoose.disconnect();
