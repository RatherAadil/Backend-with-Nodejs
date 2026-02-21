import { User } from './userModel.js';

const user = await User.find({ name: 'Danish' });
console.log(user);
