import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
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
    },
    rootDirId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    picture: {
      type: String,
      default: 'https://cdn-icons-png.freepik.com/512/3177/3177440.png',
    },
    role: {
      type: String,
      enum: ['Admin', 'Manager', 'User','Owner'],
      default: 'User',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    strict: 'throw',
  },
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = model('User', userSchema);
export default User;
