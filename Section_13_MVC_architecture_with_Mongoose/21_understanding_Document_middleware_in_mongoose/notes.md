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
