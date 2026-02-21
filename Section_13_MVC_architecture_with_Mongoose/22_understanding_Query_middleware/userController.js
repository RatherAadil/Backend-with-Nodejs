import { User } from './userModel.js';

const user = await User.find({ name: 'Rather Aadil' });
console.log(user);
