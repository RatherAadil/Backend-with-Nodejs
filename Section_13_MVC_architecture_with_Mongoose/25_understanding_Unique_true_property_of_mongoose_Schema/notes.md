# Unique true property

Used in schema to enforce unique values for a field.

    * email: { type: String, unique: true }
    * It creates a unique index.
    * If duplicates exist, index creation fails.
    * Clean duplicates before creating the index.

## Model.init()

- Ensures all indexes defined in the schema are created in the DB.
- Useful when auto-indexing is off.
- await User.init();

### autoIndex in Mongoose

- Controls whether Mongoose builds indexes automatically when the app starts.
- Schema Level:

```js
const schema = new Schema({}, { autoIndex: false });
```

- Connection Level:

```js
mongoose.connect(uri, { autoIndex: false });
```
