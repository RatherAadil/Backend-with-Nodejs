# Mongoose Schema Essentials

## Common Field Properties

```js
const userSchema = new mongoose.Schema({
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
});
```

## Other Schema Options

- Passed in the second argument of new mongoose.Schema():

```js
const schemaOptions = {
  strict: true, // Ignores fields not defined in the schema
  timestamps: true, // Adds createdAt and updatedAt
  versionKey: false, // Removes __v field
  collection: 'users', // Custom collection name
  timeseries: {}, // For time-series collections (MongoDB >= 5.0)
};
const userSchema = new mongoose.Schema(
  {
    /* fields */
  },
  schemaOptions,
);
```

## ObjectId Reference

```js
userId: {
type: mongoose.Schema.Types.ObjectId,
}
```

## Making any field required based on condition

- Suppose we allow the users above age 16 to create account, but if a smaller age user wants to create account they need their parentId

```js
 parentId: {
      type: Schema.Types.ObjectId,
      required: function () {
        return this.age < 16;
      },
      default: null,
    },
```

- `this` will point here to the object that we want to insert.

* If a user age is > 16 we are setting parentId to `null` by default.
