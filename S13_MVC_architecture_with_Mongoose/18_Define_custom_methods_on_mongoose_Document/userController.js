import { User } from './userModel.js';

const user = await User.findOne({ email: 'danish@abc.com' });
console.log(user.getUserSummary('full'));
