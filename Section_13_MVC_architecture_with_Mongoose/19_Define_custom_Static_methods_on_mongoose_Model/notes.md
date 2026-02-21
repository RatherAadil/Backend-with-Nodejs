# Custom Static Methods

You can define model-level methods using the statics option in the schema:

```js
const userSchema = new mongoose.Schema(
  {
    email: String,
  },
  {
    statics: {
      findByEmail(email) {
        return this.findOne({ email });
      },
    },
  },
);
```

- this refers to the model
- Used like: User.findByEmail("abc@example.com")
- You can also add them manually:

```js
    userSchema.statics.findByEmail = async function (email) { ... }
```
