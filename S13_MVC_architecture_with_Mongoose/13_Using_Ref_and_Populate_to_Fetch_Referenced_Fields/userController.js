import { User } from './userModel.js';

const user = await User.findOne({ email: 'danish@abc.com' }).populate(
  'parentId',
);

// If only certain properties are needed from referenced document
const user1 = await User.findOne({ email: 'danish@abc.com' }).populate({
  path: 'parentId',
  select: 'name age -_id',
});

// Find nested referenced document
const user2 = await User.findOne({ email: 'danish@abc.com' }).populate({
  path: 'parentId',
  select: 'name age -_id',
  populate: {
    path: 'parentId',
    select: 'name age -_id',
  },
});

console.log(user2);
