import { User } from './userModel.js';

//findOneAndDelete()
const user1 = await User.findOneAndDelete({ name: 'Abdul Hay' });
console.log(user);

//findByIdAndDelete()
const user2 = await User.findByIdAndDelete({ _id: '6995a77a75f838cbdd771340' });
console.log(user);
