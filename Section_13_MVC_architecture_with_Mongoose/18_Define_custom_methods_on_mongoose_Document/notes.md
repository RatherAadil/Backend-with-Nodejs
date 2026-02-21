# Custom Instance Methods

- You can define document-level methods using the methods option in the schema:

```js
const userSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    methods: {
      getSummary() {
        return `User: ${this.name}`;
      },
    },
  },
);
```

- this refers to the document
- Used like: user.getSummary()
- You can also add them manually:

```js
  userSchema.methods.getSummary = function () { ... }
```
