import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'name field is required. Please enter the name.'],
      minLength: 3,
      trim: true,
    },
    age: {
      type: Number,
      required: [true, 'age field is required. Please enter the age.'],
      min: 18,
    },
    email: {
      type: String,
      required: true,
      match: [
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        'Please enter a valid email',
      ],
      lowercase: true,
      trim: true,
    },
    hobbies: [String],
    parentId: {
      type: Schema.Types.ObjectId,
      required: function () {
        return this.age < 16;
      },
      default: null,
    },
  },
  {
    strict: 'throw',
    timestamps: true,
    // versionKey:'__v' // or false
    // collection:'test'
  },
);

const User = mongoose.model('User', userSchema);
const data = await User.insertOne({
  name: 'Rather Yawar',
  age: 25,
  email: 'zubair@gmail.com',
  hobbies: ['Cricket', 'Coding'],
  parentId: '69959ca33e0cbf2d954bbad7',
});

console.log(data);
