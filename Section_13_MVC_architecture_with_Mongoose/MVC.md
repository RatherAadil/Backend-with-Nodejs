# MVC Architecture

## What is MVC?

**MVC (Model-View-Controller)** is a software architectural pattern that separates an application into three interconnected components:

1. **Model (M)** - Manages the data and business logic.
2. **View (V)** - Handles the presentation layer and user interface.
3. **Controller (C)** - Acts as a mediator between the Model and the View, processing user requests and updating the Model or View accordingly.

## Components of MVC

### 1. Model

- The **Model** is responsible for managing the application's data, logic, and rules.
- It retrieves, processes, and updates data in response to requests from the Controller.
- It interacts with databases, APIs, or other data sources.

### 2. View

- The **View** is responsible for presenting data to the user in a structured and interactive way.
- It receives data from the Model and formats it for display.
- It does not contain business logic but may include presentation logic.

### 3. Controller

- The **Controller** acts as an intermediary between the Model and the View.
- It processes user input, interacts with the Model, and updates the View accordingly.
- It contains the application's logic for handling requests and directing responses.

## How MVC Works

1. **User Request** - The user interacts with the application (e.g., clicking a button or submitting a form).
2. **Controller Processes Request** - The Controller receives the request, processes it, and determines the next step.
3. **Model Updates Data** - If necessary, the Controller interacts with the Model to retrieve, update, or manipulate data.
4. **View Renders Output** - The Controller sends the processed data to the View, which renders the final UI.
5. **User Sees Updated Page** - The user sees the updated page or interface.

## Benefits of MVC

- **Separation of Concerns**: Divides application logic, UI, and data management into separate components, making the code more organized and maintainable.
- **Scalability**: Allows for easier modification and expansion without affecting other components.
- **Reusability**: Components can be reused across different parts of an application.
- **Maintainability**: Since logic and presentation are separate, debugging and making changes is easier.

## When to Use MVC?

- Ideal for **web applications** with structured UI and data management.
- Useful when working with **frameworks** that support MVC (e.g., Express.js, Ruby on Rails, ASP.NET, Django).
- Suitable for **large-scale applications** that require clear separation of responsibilities.

## Conclusion

The **MVC architecture** is a widely adopted design pattern that improves the structure, maintainability, and scalability of applications. By dividing an application into **Model, View, and Controller**, it ensures that code is modular, reusable, and easier to manage.

---

# Controller in MVC

    -> Purpose: Handles incoming HTTP requests, interacts with Models, and sends responses
    (usually JSON).

    -> Location: Stored in a dedicated controllers/ folder.

    -> Structure: Each controller file contains functions related to a specific resource
    (e.g., userController.js).

    -> Role in Flow: Router → Controller → Model → Controller → Response.

## What is controller

- Controller is nothing just a handler function in a seperate folder

* It helps to make the code clean and understandable.

---

# View

- The View is responsible for displaying the UI.
- In traditional MVC, it handles Server-Side Rendering (SSR) by generating dynamic HTML or JSX.

Common View Engines in Express:

    EJS (Embedded JavaScript):
        -> Syntax similar to HTML with <%= %> to insert dynamic data.
        -> Easy to integrate.

    Pug (formerly Jade):
        -> Minimalist template engine.
        -> Uses indentation instead of HTML tags.

    Handlebars:
        -> Logic-less templating.
        -> Uses {{ }} for dynamic data.

    react-express-view:
        -> Allows rendering React components (JSX) on the server.
        -> Great for React-based SSR apps.

---

# Models and Mongoose (ODM for MongoDB)

## What is Mongoose?

- Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js.
- It allows you to define schemas and interact with MongoDB using models.

### Connection

```js
mongoose.connect(uri);
```

### Defining a Model

```js
const Model = mongoose.model('CollectionName', schemaObject);
```

- The CollectionName should be capitalized as a standard practice.
- Mongoose will:
  - Automatically convert the name to lowercase
  - Pluralize it (e.g., "User" becomes "users")

### Customize Pluralization

```js
mongoose.pluralize((word) => word); // disables pluralization
```

### Disable Auto Collection Creation

```js
mongoose.set('autoCreate', false);
```

- By default, Mongoose auto-creates collections even if no documents are inserted.
- Disabling this avoids unnecessary empty collections.

### Insert Data

```js
const Model = mongoose.model('CollectionName', schemaObject);
await Model.insertOne({ name: 'xyz' }); // ⚠️ Use `Model.create()` instead
```

**Note:** `Model.insertOne()` is not a Mongoose method — it's from native MongoDB.

- Use:

```js
await Model.create({ name: 'xyz' });
```

### Schema vs Model

- **Schema:** Defines the shape of documents (application-level).
- **Model:** Provides the interface for interacting with the DB collection using that schema.

---

# Mongoose Query Behavior

## Connection Dependency

    -> No query is executed until Mongoose is connected to the database.
    -> Queries will be queued internally and executed once the connection is established

```js
mongoose.connect(uri);
```

- Only after successful connection, queries will run

## Shared Connection

    -> A single Mongoose connection is reused across all files/modules.
    -> This means you typically connect once (e.g., in index.js or db.js) and then import
      the models in other files without reconnecting.

db.js

```js
mongoose.connect(uri);
```

userModel.js

```js
const User = mongoose.model('User', userSchema); // uses the same connection
```

---

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

---

# Mongoose Schema Field Options

Mongoose provides various options that can be passed inside a schema field definition to customize its behavior.

## Available Schema Options

| Option                    | Description                                                                               |
| ------------------------- | ----------------------------------------------------------------------------------------- |
| `type`                    | Defines the field data type.                                                              |
| `required`                | Makes the field mandatory. Can be a boolean, function, or an array with a custom message. |
| `unique`                  | NOT a validator. It only creates a MongoDB index.                                         |
| `default`                 | Provides a default value if none is given when creating a document.                       |
| `enum`                    | Restricts the field to specific values. Used for defining allowed values.                 |
| `validate`                | Adds custom validation logic, can be synchronous or asynchronous.                         |
| `match`                   | Validates the value using a regular expression pattern.                                   |
| `minlength` / `maxlength` | Sets minimum and maximum length for strings.                                              |
| `min` / `max`             | Defines minimum and maximum values for numbers or dates.                                  |
| `lowercase`               | Converts the string to lowercase before saving.                                           |
| `uppercase`               | Converts the string to uppercase before saving.                                           |
| `trim`                    | Removes whitespace from the beginning and end of a string.                                |
| `immutable`               | Prevents modifications after the document is created.                                     |
| `alias`                   | Creates a virtual field alias for another field.                                          |
| `get`                     | Defines a getter function to transform the value when retrieved.                          |
| `set`                     | Defines a setter function to modify the value before saving.                              |
| `select`                  | Excludes the field from queries unless explicitly included.                               |

## Example Schema with Various Options

```js
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email format',
    ],
    validate: {
      validator: async function (value) {
        const existingUser = await mongoose
          .model('User')
          .findOne({ email: value });
        return !existingUser;
      },
      message: 'Email already exists',
    },
  },
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 15,
    trim: true,
  },
  age: {
    type: Number,
    min: 18,
    max: 99,
  },
  password: {
    type: String,
    required: true,
    select: false, // Do not return password by default
    set: (value) => bcrypt.hashSync(value, 10), // Hash password before saving
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

const User = mongoose.model('User', userSchema);
```

---

# Mongoose Data Types

Mongoose provides several built-in schema types that map to MongoDB’s BSON types.

## 1. String

- Represents text data.
- Equivalent to BSON `String`.
- Example:
  ```js
  name: String;
  ```

## 2. Number

- Represents numerical values.
- Equivalent to BSON `Double`.
- Example:
  ```js
  age: Number;
  ```

## 3. Boolean

- Represents a true/false value.
- Equivalent to BSON `Boolean`.
- Example:
  ```js
  isActive: Boolean;
  ```

## 4. Date

- Represents a date/time.
- Equivalent to BSON `Date`.
- Example:
  ```js
  createdAt: Date;
  ```

## 5. Buffer

- Stores binary data (e.g., images, files).
- Equivalent to BSON `Binary Data`.
- Example:
  ```js
  profilePicture: Buffer;
  ```

## 6. ObjectId

- Represents MongoDB ObjectId.
- Used for referencing other documents.
- Equivalent to BSON `ObjectId`.
- Example:
  ```js
  userId: mongoose.Schema.Types.ObjectId;
  ```

## 7. Mixed (Schema.Types.Mixed)

- Stores any arbitrary data type.
- Equivalent to BSON `Mixed`.
- Example:
  ```js
  meta: mongoose.Schema.Types.Mixed;
  ```

## 8. Array

- Represents an array of values.
- Example:
  ```js
  tags: [String];
  ```

## 9. Decimal128

- Represents high-precision floating-point numbers.
- Equivalent to BSON `Decimal128`.
- Example:
  ```js
  price: mongoose.Schema.Types.Decimal128;
  ```

## 10. Map

- Represents a key-value pair object where keys are strings.
- Equivalent to BSON `Object`.
- Example:
  ```js
  attributes: { type: Map, of: String }
  ```

## 11. UUID (Mongoose v7+)

- Stores Universally Unique Identifiers.
- Equivalent to BSON `UUID`.
- Example:
  ```js
  sessionId: mongoose.Schema.Types.UUID;
  ```

## Example Schema

```js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  isActive: Boolean,
  createdAt: Date,
  profilePicture: Buffer,
  userId: mongoose.Schema.Types.ObjectId,
  meta: mongoose.Schema.Types.Mixed,
  tags: [String],
  price: mongoose.Schema.Types.Decimal128,
  attributes: { type: Map, of: String },
  sessionId: mongoose.Schema.Types.UUID,
});

const User = mongoose.model('User', userSchema);
```

---

# CRUD Operations Using Mongoose

Setup First (Define Schema & Model)

```js
import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'name field is required. Please enter the name.'],
      minLength: 3,
      trim: true,
    },
  },
  {
    strict: 'throw',
    timestamps: true,
  },
);
export const User = model('User', userSchema);
```

## Create Operation

- `insertOne()`

* (Not native to Mongoose — use MongoDB driver or .create() instead)

```js
await User.insertOne({
  name: 'Rather Yawar',
  age: 25,
  email: 'zubair@gmail.com',
  hobbies: ['Cricket', 'Coding'],
});
```

- `insertMany()`

Inserts an array of documents:

```js
await User.insertMany([
  { name: 'John', email: 'john@g.com' },
  { name: 'Jane', email: 'jane@g.com' },
]);
```

- `create()`
  Flexible method that handles one or many:

```js
await User.create({ name: 'Mike', email: 'mike@g.com' });
await User.create([{ name: 'A' }, { name: 'B' }]);
```

- `Using Instance & save()`

```js
const user = new User({ name: 'Sam', email: 'sam@g.com' });
await user.save(); // Saves to DB
```

## Read Operation

- `Find one`

```js
const user = await User.findOne({ email: 'xyz@g.com' }).lean();
```

- Here, .lean() returns plain JS object (better performance, no Mongoose methods)

* `Find all`

```js
const users = await User.find().lean(); // Array of all users
```

- `Find by ID`

```js
const user = await User.findById('user_id').lean();
```

## Update Operation

1.  `Inefficient Way (2 DB Calls)`

```js
const user = await User.findOne({ email: 'xyz@g.com' });
user.age = 12;
await user.save();
```

2.  `Efficient Way (Single DB Call)`

```js
const updatedUser = await User.findOneAndUpdate(
  { email: 'xyz@gg.com' },
  { name: 'Shizuka' },
  { returnDocument: 'after', runValidators: true },
);
```

- returnDocument: 'after' → Returns the updated document
- runValidators: true → Ensures validation is applied during update

## Delete Operation

- Delete one by condition

```js
await User.findOneAndDelete({ email: 'xyz@g.com' });
```

- Delete by ID

```js
await User.findByIdAndDelete('user_id');
```

- Delete many

```js
await User.deleteMany({ age: { $lt: 18 } });
```

---

## Updation via Instance (BTS)

```js
export const User = model('User', userSchema);
```

`model()` turns your schema into a Model (Constructor Function)

When you call:

```js
model('User', userSchema);
```

**Mongoose:**

    * Takes your userSchema
    * Compiles it
    * Returns a Model

That returned User is a constructor function (like a class).

```js
const user = new User({
  name: 'Rather Yawar',
  age: 25,
  email: 'zubair@gmail.com',
  hobbies: ['Cricket', 'Coding'],
});
```

User is acting as a class because:

    * mongoose.model() returns a constructor
    * You use new
    * It creates an instance with schema behavior
    * That instance has built-in methods

So yes — User is a class generated by Mongoose from your schema.

---

# Thenable Objects

- A thenable is any object with a .then() method.
- It acts like a promise, but isn’t necessarily created using Promise.
- Works with await and Promise.resolve().

Example:

```js
const thenable = {
  then: (resolve, reject) => {
    resolve('Done!');
  },
};
await thenable; // Works like a promise
```

---

# Mongoose Query and Query Chaining

## What is a Mongoose Query?

A **Mongoose query** is an object that represents an operation on a MongoDB collection. It is **thenable but not a Promise**; however, it behaves like a Promise.

### Example:

```javascript
const users = User.find({ age: { $gte: 18 } });
console.log(users instanceof Promise); // false

await users; // Works because it's thenable
```

## Lazy Execution:

A query doesn't run until you:

    await it or
    Call .then() or
    Use .exec()

```js
const query = User.find({ age: { $gt: 18 } }); // not yet executed
const result = await query; // now it's executed
```

## Chaining Queries in Mongoose

Mongoose allows **query chaining**, enabling you to refine the query step by step before execution. Since queries return query objects, you can keep adding methods before execution.

### Example of Chaining Queries:

```javascript
const users = await User.find({ age: { $gte: 18 } })
  .sort({ name: 1 })
  .limit(10)
  .select('name age');
```

### Explanation:

1. `.find({ age: { $gte: 18 } })` - Finds all users aged 18 or above.
2. `.sort({ name: 1 })` - Sorts results by name in ascending order.
3. `.limit(10)` - Limits the results to 10 users.
4. `.select("name age")` - Fetches only the `name` and `age` fields.
5. `await` - Waits for the result because the query is thenable.

## Using `.exec()` for Full Promise Behavior

To convert a Mongoose query into a **real Promise**, use `.exec()`:

```javascript
const users = await User.find({ age: { $gte: 18 } }).exec();
console.log(users instanceof Promise); // true
```

This ensures the query behaves exactly like a native JavaScript Promise.

## Using `.getQuery()` to Inspect the Query

Mongoose provides the `.getQuery()` method to inspect the query conditions before execution.

### Example:

```javascript
const query = User.find({ age: { $gte: 18 } });
console.log(query.getQuery()); // { age: { $gte: 18 } }
```

This is useful for debugging queries before execution.

## Using `.where()` for SQL-Style Querying

The `.where()` method allows constructing queries in a more expressive way.

### Example:

```javascript
const users = await User.where('age')
  .gte(18)
  .lte(30)
  .where('name')
  .equals('John')
  .select('name age');
```

### Explanation:

- `.where("age").gte(18).lte(30)` - Finds users whose age is between 18 and 30.
- `.where("name").equals("John")` - Filters users whose name is "John".
- `.select("name age")` - Retrieves only the `name` and `age` fields.

## Negative Selections (Excluding Fields)

Mongoose allows negative selections to exclude fields from the result by prefixing the field with `-`.

### Example:

```javascript
const users = await User.find().select('-password -email');
```

### Explanation:

- `-password` excludes the `password` field.
- `-email` excludes the `email` field.

Another example:

```javascript
const users = await User.find({}, { password: 0, email: 0 });
```

This achieves the same result using an object notation.

---

# **Mongoose Documents**

## **1. What Are Document Objects in Mongoose?**

In Mongoose, a **document object** is an **instance of a model**, representing a **single document** in a MongoDB collection.

### **📌 Characteristics of a Mongoose Document Object**

- It is **not just a plain JavaScript object**; it has **Mongoose-specific methods and behaviors**.
- It is an **instance of the model** (`new Model()`).
- It **inherits from the `Document` class**.
- It supports **schema-based validation, middleware, and instance methods**.
- It has the ability to **talk to MongoDB** and **update itself** when calling methods like `.save()` or `.updateOne()`.

### **🚀 Example: Creating and Working with a Mongoose Document**

```js
// Create a document instance
const user = new User({ name: 'Alice', email: 'alice@example.com', age: 25 });

console.log(user instanceof mongoose.Document); // ✅ true
console.log(user instanceof User); // ✅ true
console.log(user.toObject()); // ✅ Converts it to a plain JS object
```

📌 **Output**

```js
true
true
{ _id: ..., name: 'Alice', email: 'alice@example.com', age: 25 }
```

✅ **This confirms that `user` is a Mongoose document and has additional methods beyond a plain object.**

## **2. Can a Mongoose Document Talk to MongoDB?**

### **✅ Yes, a Mongoose Document Can "Talk" to MongoDB and Update It**

A **Mongoose document can interact with MongoDB** and **update itself**, but **only when explicitly instructed**.

### **🔹 Why a Mongoose Document Can "Talk" to MongoDB?**

1. **It is an instance of the model**, meaning it is **aware of the database collection** it belongs to.
2. **It has built-in methods** (like `.save()`, `.deleteOne()`, `.updateOne()`) that allow it to **perform database operations**.
3. **It tracks changes** using `.isModified()` and only updates changed fields.
4. **It supports middleware hooks** (like `pre("save")`) that allow additional operations before updating MongoDB.

### **🚀 Example: Updating a Document from a Mongoose Instance**

#### **1️⃣ Updating a Document (Using `.save()`)**

```js
const user = await User.findOne({ email: 'johndoe@example.com' });

user.age = 30; // Modify a field
await user.save(); // ✅ Updates MongoDB
```

✅ **What happens?**

- The document **modifies itself in memory**.
- Calling `.save()` **sends an update to MongoDB**.

#### **2️⃣ Checking If a Field Is Modified Before Updating**

```js
const user = await User.findOne({ email: 'johndoe@example.com' });

console.log(user.isModified('age')); // ❌ false

user.age = 30;
console.log(user.isModified('age')); // ✅ true

await user.save(); // ✅ Updates MongoDB
```

✅ **Why Is This Useful?**

- **Prevents unnecessary writes** (only updates changed fields).
- **Ensures efficient database interaction**.

#### **3️⃣ Directly Updating MongoDB from a Document (`updateOne()`)**

```js
const user = await User.findOne({ email: 'johndoe@example.com' });

await user.updateOne({ $set: { age: 35 } }); // ✅ Updates MongoDB
```

✅ **Why Use `.updateOne()` Instead of `.save()`?**

- **Faster than `.save()`** (does not reload the entire document).
- **More efficient for small updates**.

## **3. Most Commonly Used Methods on Mongoose Documents**

| **Method**          | **Purpose**                                             | **Example Usage**                        |
| ------------------- | ------------------------------------------------------- | ---------------------------------------- |
| **`.save()`**       | Saves the document to the database                      | `await user.save();`                     |
| **`.toObject()`**   | Converts the document to a plain JS object              | `const obj = user.toObject();`           |
| **`.toJSON()`**     | Converts the document to JSON format                    | `const json = user.toJSON();`            |
| **`.updateOne()`**  | Updates the document in the database                    | `await user.updateOne({ age: 30 });`     |
| **`.remove()`**     | Removes the document from the database (deprecated)     | `await user.remove();` (deprecated)      |
| **`.deleteOne()`**  | Removes the document from the database                  | `await user.deleteOne();`                |
| **`.isNew`**        | Checks if the document is newly created (not yet saved) | `console.log(user.isNew);`               |
| **`.isModified()`** | Checks if a field has been modified                     | `console.log(user.isModified("email"));` |
| **`.populate()`**   | Populates referenced fields                             | `await user.populate("posts");`          |
| **`.validate()`**   | Manually triggers schema validation                     | `await user.validate();`                 |

---

# Custom Validation in Mongoose

Mongoose allows custom field validation using the validate option in schemas.

Syntax:

```js
    field: {
        type: String,
        validate: {
            validator: function (val) { return val.length > 3; },
            message: "Field must be longer than 3 characters."
        }
    }
```

Features:

    * Return true if valid, false if invalid.
    * Use props.value in error messages.
    * Supports async validators (e.g., checking uniqueness in DB).

---

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

# Mongoose Virtuals

- Virtuals are computed properties in Mongoose documents, not stored in MongoDB.
- Common use: derive fullName from firstName + lastName.
- Mongoose adds an id virtual by default (string version of \_id).

## Creating Virtuals

We can create virtuals in multiple ways:

#### 1. Add `virtuals` property in Schema configuration.

```js
{
    strict: 'throw',
    timestamps: true,
    virtuals: {
      isAdult: {
        get() {
          return this.age >= 18;
        },
      }
    }
}
```

- Here `isAdult` is a virtual property

* We can also set the value of properties using setters

```js
 hobbiesString: {
        get() {
          return this.hobbies.join(', ');
        },
        set(value) {
          this.hobbies = [...this.hobbies, ...value.split(', ')];
        },
      },
```

#### 2. Directly Using schema.virtual()

- Getter only

```js
schema.virtual('fullName').get(() => ...)
```

- Getter + Setter

```js
schema.virtual('fullName').get(() => ...).set(val => ...)
```

#### 3. using alias

- If we add `alias` on any property, it also becomes a virtual.

```js
name: {
type: String,
required: [true, 'name field is required. Please enter the name.'],
minLength: 3,
trim: true,
alias: 'naam',
},
```

- Here `naam` is a virtual.

## Accessing Virtuals

We can directly access a virtual with a document.

```js
const user = await User.findOne({ email: 'danish@abc.com' });
console.log(user.isAdult;)
```

#### Enable in output

- If we are using .toJSON() or .toObject() we need enable them.

```js
doc.toJSON({ virtuals: true });
doc.toObject({ virtuals: true });
```

- To check all virtuals

```js
doc.schema.virtuals;
```

Virtuals & .lean()

    -> By default, virtuals do not work with .lean().
    -> To include them:
    Model.find().lean({ virtuals: true })

---

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

---

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

---

# Mongoose Middleware (Hooks)

Mongoose middlewares (hooks) are functions that run before (pre) or after (post) certain operations like saving, querying, inserting, or aggregating.

## Types of Middleware

    * Document Middleware (save, validate, remove)
        Used to modify document data (e.g., hash passwords).

    * Query Middleware (find, findOne, etc.)
        Modify or log queries (e.g., exclude inactive users).

    * Model Middleware (insertMany)
        Modify documents before/after bulk insert.

    * Aggregate Middleware (aggregate)
        Edit aggregation pipeline (e.g., exclude deleted docs).

---

# Mongoose Document Middleware

- Document middleware (also called document hooks) are functions that run before or after actions are performed on a specific document instance.

* `this` refers to the document being modified.

- They let you execute logic automatically around document-level operations like saving or validating a document.

* These run on individual document instances:

* `save`
* `validate`
* `deleteOne` (when called on a document)

```js
userSchema.pre('save', function () {
  console.log('Running my Document Middleware');
  this.password = this.name + this.age;
});
userSchema.post('save', function (doc) {
  console.log(`Your account is created and your password is : ${doc.password}`);
});
```

- Here in post save Document middleware we get the actual document. If we inserted a document we would get that document.

* In pre save Document middleware we get the next() method which we can call so that the next middleware gets executed.

---

# Mongoose Query Middleware

- Query middleware runs on query methods like find, findOne, findOneAndUpdate etc.

- pre() runs before query execution

- post() runs after query execution

- this inside query middleware refers to the query object

```js
userSchema.pre('find', function () {
  this.find({ age: { $gte: 30 } });
});
```

- Here this query middleware would only work for `find` query. Like:

```js
const user = await User.find({ name: 'Rather Aadil' });
```

- We would only get that user who has age >=30

#### We can make Query middleware to work for multiple query methods:

```js
userSchema.pre(['find', 'findOne'], function () {
  this.find({ age: { $gte: 30 } });
});
```

- It would work for both `find()` and `findOne()`

#### We can also pass the regex

```js
userSchema.pre(/^find/, function () {
  console.log('Running my Query Middleware');
  this.find({ age: { $gte: 30 } });
});
```

- Now it would work for every operation starting with find

#### Same goes for post()

```js
userSchema.post('find', function (doc) {
  console.log(doc);
  console.log('Hii');
});
```

---

# Mongoose Model Middleware

- Model middleware (also called static middleware) are hooks that run before or after model-level (static) methods are executed.

* Unlike document middleware (which runs on a document instance), model middleware runs on the Model itself.

* Some common model middleware methods include:
* `insertMany`
* `bulkWrite`
* `createCollection`

Example:

```js
userSchema.pre('insertMany', function (docs) {
  console.log('Running insertMany Model Middleware');
  for (const doc of docs) {
    doc.password = doc.name + doc.age;
  }
});
```

- Here we get the array of all the documents that were inserted. That's why we are using loop on that array to add password on each document.

```js
await User.insertMany([
  { name: 'Zubair', age: 24, email: 'Zubair@abc.com' },
  { name: 'Yawar', age: 20, email: 'yawar@abc.com' },
  { name: 'Uzair', age: 18, email: 'Uzair@example.com' },
]);
```
