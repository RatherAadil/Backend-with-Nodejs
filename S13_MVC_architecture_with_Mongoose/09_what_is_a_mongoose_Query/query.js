import { User } from './userModel.js';

const query = User.find({ name: 'Danish' }).lean();
query.select('name age');
console.log(await query);
