# Creating new collection with validation Enabled in mongoDB

In this lecture we learned about how to create a collection with validation enabled.

We learned it using two ways:

1.  **Using db.command()**

        - with db.command() we use create command to create a collection and a validation object.

Example:

```javascript
await db.command({
  create: 'users',
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
});
```

2.  **Using db.createCollection('collectionName',validationObject)**

Example:

```javascript
await db.createCollection('users', {
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
});
```
