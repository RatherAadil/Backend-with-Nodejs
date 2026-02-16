# MongoDB in Nodejs

- MongoDB provides drivers for every popular backend language to work with it.
- We also have Driver for NodeJS
- Installation:

```bash
npm i mongodb
```

#### Import and Connect

```javascript
import { MongoClient } from 'mongodb';
const client = new MongoClient('mongodb://127.0.0.1:27017/');
await client.connect(); // Connect to MongoDB server
```

#### Database Access

```javascript
const db = client.db(); // Default 'test' DB
const db = client.db('DataBaseName'); // Use a specific DB
```

#### View Collections

```javascript
console.log(await db.listCollections().toArray());
// Lists all collections in the selected DB
```

#### Access Documents in a Collection

```javascript
const collection = db.collection('fruits');
console.log(await collection.find().toArray());
// Fetches all documents in the 'fruits' collection
```

#### List All Databases

```javascript
const admin = client.db().admin();
console.log(await admin.listDatabases());
// Lists all databases on the server
```
