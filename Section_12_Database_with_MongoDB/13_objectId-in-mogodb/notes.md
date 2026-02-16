# ObjectId Data Type

- ObjectId is a 24 character (12 bytes) unique identifier used by MongoDB, 2 characters representing 1 byte.

* We can get simply an ObjectId by writing `ObjectId()` command in mongo shell (mongosh)

* First `4` bytes (8 characters) `represent the timestamp` (time of creation)
  we can parse this hex string into decimal & multiply with 1000 and pass it inside new Date() to get the exact date & time
* Next `5` bytes (10 characters) `represent the machine identifier`, which is unique to the machine/process
* Next `2 `bytes (4 characters) `represent the process ID`, identifying the MongoDB process
* Last `3 `bytes (6 characters) `represent the counter`, an auto-incrementing value to ensure uniqueness within the same second.

* We can also add our own objectId while inserting document inside a collection
  For example

```javascript
db.fruits.insertOne({ name: 'Mango', _id: '123' });
```
