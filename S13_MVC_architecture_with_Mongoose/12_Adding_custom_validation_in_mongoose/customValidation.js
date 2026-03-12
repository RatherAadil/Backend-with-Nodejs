import { User } from './userModel.js';

const user = await User.create({
  name: 'Aadil',
  age: 26,
  email: 'aadil@abc.com',
  hobbies: ['Coding', 'Watching reels'],
});

console.log(user);
