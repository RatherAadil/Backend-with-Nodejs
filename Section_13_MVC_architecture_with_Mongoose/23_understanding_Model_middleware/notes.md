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
