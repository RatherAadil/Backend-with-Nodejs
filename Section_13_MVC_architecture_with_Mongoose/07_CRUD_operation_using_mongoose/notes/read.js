import { User } from './userModel.js';

//Find One
const user = await User.findOne({ name: 'Abdul Hay' }).lean();
console.log(user);

//Find
const users = await User.find().lean();
