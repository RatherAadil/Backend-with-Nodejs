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
