import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'name field is required. Please enter the name.'],
      minLength: 3,
      trim: true,
      alias: 'naam',
    },
    age: {
      type: Number,
      required: [true, 'age field is required. Please enter the age.'],
      min: 12,
      validate: {
        validator: function () {
          return this.age % 2 === 0;
        },
        message: 'age can only be even number',
      },
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
      ref: 'User',
      default: null,
    },
  },
  {
    strict: 'throw',
    timestamps: true,
    virtuals: {
      isAdult: {
        get() {
          return this.age >= 18;
        },
      },
      hobbiesString: {
        get() {
          return this.hobbies.join(', ');
        },
        set(value) {
          this.hobbies = [...this.hobbies, ...value.split(', ')];
        },
      },
    },
    methods: {
      getUserSummary(options) {
        if (options === 'full') {
          return `${this.name} is ${this.age} years old. And he/she has these hobbies: ${this.hobbies.join(', ')}.`;
        }
        return `${this.name} is ${this.age} years old.`;
      },
    },
    statics: {
      findOneByName(name) {
        return this.findOne({ name });
      },
    },
  },
);
export const User = model('User', userSchema);
