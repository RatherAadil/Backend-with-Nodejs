import { model, Schema } from 'mongoose';

const userSchema = Schema(
  {
    name: {
      type: String,
      minLength: [3, 'name should be atleast 3 characters long'],
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        'Please enter a valid email',
      ],
    },
    password: {
      type: String,
      minLength: 4,
      required: true,
    },
    rootDirId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    strict: 'throw',
  },
);

const User = model('User', userSchema);
export default User;
