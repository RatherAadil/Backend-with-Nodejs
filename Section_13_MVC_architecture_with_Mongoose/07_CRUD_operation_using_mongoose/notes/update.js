import { User } from './userModel.js';

//Update using instance (thenable object)--> requires two db calls
const user = await User.findOne({ name: 'Abdul Hay' });
user.age = 27;
await user.save(); //second db call
console.log(user);

//findOneAndUpdate(find,newvalue,options)  By default bypasses the validation so use  runValidators: true
const user = await User.findOneAndUpdate(
  { name: 'Abdul Hay' },
  { age: 27 },
  { returnDocument: 'after', runValidators: true },
);

// findByIdAndUpdate()
const user = await User.findByIdAndUpdate(
  { _id: '6995a77a75f838cbdd771341' },
  { age: 18 },
  { returnDocument: 'after', runValidators: true },
);
