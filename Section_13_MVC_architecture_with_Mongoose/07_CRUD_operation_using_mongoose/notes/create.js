import { User } from '../userModel.js';

//Insert Single document using create()

await User.create({
  name: 'Rather Yawar',
  age: 25,
  email: 'zubair@gmail.com',
  hobbies: ['Cricket', 'Coding'],
});
// Insert using insertOne()
await User.insertOne({
  name: 'Rather Yawar',
  age: 25,
  email: 'zubair@gmail.com',
  hobbies: ['Cricket', 'Coding'],
});

//Insert Multiple documents using create([])

await User.create([
  {
    name: 'Rather Yawar',
    age: 25,
    email: 'zubair@gmail.com',
    hobbies: ['Cricket', 'Coding'],
  },
  {
    name: 'Rather Aadil',
    age: 25,
    email: 'Aadil@gmail.com',
    hobbies: ['Cricket', 'Coding'],
  },
]);

//Create using Instance

const user = new User({
  name: 'Abdul Hay',
  age: 25,
  email: 'Hay@gmail.com',
  hobbies: ['sleeping'],
});
const data = await user.save();
console.log(data);
