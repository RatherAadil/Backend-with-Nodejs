# mongoDB CRUD in Nodejs

- First establish connection to mongodb connection string
- Then select database and collections

#### Setup

```javascript
const db = client.db('DataBaseName');
const collection = db.collection('users');
```

#### Read

```javascript
const users = await collection.find().toArray();
```

#### Create

```javascript
await collection.insertOne({ name: 'XYZ', email: 'x@g.com', age: 34 });
```

#### Update

```javascript
await collection.updateOne({ _id: new ObjectId('...') }, { $set: { age: 35 } });
```

#### Delete

```javascript
await collection.deleteOne({ _id: new ObjectId('...') });
await collection.drop(); // Drop collection
await db.dropDatabase(); // Drop DB
```
