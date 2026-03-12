import { User } from './userModel.js';

const user = await User.findOne({ email: 'danish@abc.com' });

// console.log(user.id);
// console.log(user.isAdult);
user.hobbiesString = 'TT, cricket';
// await user.save();
console.log(user.hobbiesString);
// console.log(user.schema.virtuals);
