# ref & populate in Mongoose

- `ref`: Used in schema to reference another model using ObjectId.

```js
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
```

- `populate()`: Replaces the referenced ObjectId with the actual document.

```js
const user = await User.find().populate('author');
```

Used to create relationships (like foreign keys) between collections.

---

# Mongoose: Ref and Populate

The `ref` and `populate` methods in Mongoose are essential for establishing relationships between different collections and retrieving the associated documents. They allow you to define a field in one document that "references" a document in another collection.

---

## 1. The `ref` Property in Mongoose Schema

The `ref` property is used within a Mongoose Schema to tell Mongoose which model to use when populating the field later. It establishes the relationship at the schema definition level.

### Definition

`ref` is a schema option that specifies the name of the Mongoose Model that the ObjectId (or whatever type you're using) stored in the field belongs to.

### Syntax

You define it within the schema when defining a field that holds an ID:

```javascript
const postSchema = new mongoose.Schema({
  title: String,
  // The 'author' field holds the ID of a 'User' document
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // <-- The model name is 'User'
  },
  content: String,
});
```

### How it Works

- In your MongoDB database, the `author` field in the `posts` collection will simply store a MongoDB ObjectId belonging to a document in the `users` collection.
- The `ref: 'User'` part tells Mongoose: "Hey, when someone tries to populate this `author` field, look up the ObjectId in the collection corresponding to the `'User'` model."

---

## 2. The `populate` Method in Mongoose Queries

The `populate` method is a query builder function used to replace specified paths (fields) in the document(s) with the actual referenced document(s).

### Definition

`populate` is a Mongoose query method that automatically replaces the referenced ObjectId(s) with the complete document(s) from the collection specified by the `ref` option.

### Syntax

You chain it onto any Mongoose query (e.g., `find()`, `findOne()`, `findById()`):

```javascript
// Query to find a single post and replace its 'author' ID with the full User document
Post.findOne({ title: 'My Awesome Post' })
  .populate('author') // <-- The path (field name) to populate
  .exec((err, post) => {
    // ...
  });

// You can also specify fields to select from the populated document
Post.find({})
  .populate({
    path: 'author', // The field to populate
    select: 'username email -_id', // Select only username and email, exclude the _id
  })
  .exec();
```

### How it Works

1. When Mongoose executes the query (e.g., `Post.find().populate('author')`), it first retrieves the `Post` document(s).
2. It then extracts the ObjectId stored in the `author` field(s).
3. Using the model name defined in the `ref: 'User'` schema option, Mongoose performs a secondary query to the `users` collection using the extracted ObjectIds.
4. Finally, Mongoose replaces the ObjectId in the `author` field of the original `Post` document(s) with the full `User` document(s) retrieved from the secondary query.

---

## 3. Example: Posts and Users

Let's assume you have two models: `User` and `Post`.

### 1. Schema Definitions (with `ref`)

```javascript
// user.model.js
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
});
const User = mongoose.model('User', userSchema);

// post.model.js
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  // ESTABLISHES THE REFERENCE
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // IMPORTANT: Links to the 'User' model
  },
});
const Post = mongoose.model('Post', postSchema);
```

### 2. Data in MongoDB (Before populate)

| Post Document (Posts Collection) | User Document (Users Collection)                     |
| -------------------------------- | ---------------------------------------------------- |
| \_id: ObjectId("post123")        | \_id: ObjectId("user456")                            |
| title: "My First Blog"           | username: "BloggerUser"                              |
| author: ObjectId("user456")      | email: "[user@example.com](mailto:user@example.com)" |

### 3. Fetching Data (with populate)

```javascript
// Perform a query on the Post model and populate the 'author' field
Post.findOne({ title: 'My First Blog' })
  .populate('author') // Execute the population
  .then((post) => {
    console.log(post);
  })
  .catch((err) => console.error(err));
```

### 4. Output (After populate)

The resulting post object will look like this, with the `author` field being a complete document, not just an ID:

```javascript
{
  _id: ObjectId("post123"),
  title: "My First Blog",
  content: "...",
  // THE POPULATED DOCUMENT
  author: {
    _id: ObjectId("user456"),
    username: "BloggerUser",
    email: "user@example.com",
    __v: 0
  },
  __v: 0
}
```
