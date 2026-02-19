import { User } from './userModel.js';

const user = await User.findByIdAndUpdate(
  { _id: '6995a77a75f838cbdd771341' },
  { age: 18 },
  { returnDocument: 'after', runValidators: true },
);
console.log(user);