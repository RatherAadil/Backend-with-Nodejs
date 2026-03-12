import { User } from './userModel.js';

const user = await User.findOneByName('Danish');
console.log(user);
