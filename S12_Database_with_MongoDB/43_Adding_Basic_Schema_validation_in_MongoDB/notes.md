# Schema validation in mongoDB

In this lecture we learned about how to add validation to an already existing collection using both GUI and Code.

1.  **Using GUI (MongoDB Compass)**

        - Go to the particular DB
        - There is a field named validation,
        - From there we can set the validation manually like:

Example:

```json
 {
    name: {
      $type: 'string',
    },
    age: {
      $type: 'int',
      $gte: 18,
      $lte: 60,
    },
  },

```

2.  **Using Nodejs Driver(code)**

        - If we have a collection named 'users'
        - First we will get that collection
        - Then using the mongoDB command we can set the validation

Example:

```json
const collection = db.collection('users');

await db.command({
  collMod: 'users',
  validator: {
    name: {
      $type: 'string',
    },
    age: {
      $type: 'int',
      $gte: 18,
      $lte: 60,
    },
  },
  validationAction: 'warn',
});

```

- `CollMod` property is used to set the validation on a specified collection
- `validator` is the particular validation that we want to set

* `validationAction` by default it is error , but we can set it on warning using `warn` value.
