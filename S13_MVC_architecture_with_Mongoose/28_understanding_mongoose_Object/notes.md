# Mongoose Object

- It is nothing just a mongoDB object used internally by mongoose.
- In mongoose we can check this db object in the following way:

```js
await mongoose.connect('mongodb://admin:admin@localhost');
const db = mongoose.connection.db;
```

- And we can perform all those operations on it which we did in mongoDB
- Here we are using mongoose just to connect.

```js
const fruitsCollection = db.collection('fruits');
const result = await fruitsCollection.insertOne({ fruit: 'Mango' });
console.log(result);
```

### Mongoose connection

- It is an event emitter and we can use following events on it:

```js
mongoose.connection.on('connected', () => console.log('connected'));
mongoose.connection.on('open', () => console.log('open'));
mongoose.connection.on('disconnected', () => console.log('disconnected'));
mongoose.connection.on('reconnected', () => console.log('reconnected'));
mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
mongoose.connection.on('close', () => console.log('close'));
```

- If we use await while making the connection, only `disconnecting`, `disconnected` and `close` will be fired. Without await all will be fired.
