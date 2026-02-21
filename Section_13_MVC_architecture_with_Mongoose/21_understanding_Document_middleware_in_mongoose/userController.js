import { User } from './userModel.js';

const user = new User({
  name: 'Rather Aadil',
  age: 26,
  email: 'ratheraadil@outlook.com',
});
await user.save();
console.log(user);
