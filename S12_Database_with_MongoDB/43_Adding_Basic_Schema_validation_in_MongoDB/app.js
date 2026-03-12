import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://127.0.0.1:27017/');

await client.connect();
const db = client.db();
// const collection = db.collection('users');
// await collection.insertMany([
//   { name: 'Aadil', age: 25 },
//   { name: 'Zubair', age: 20 },
// ]);

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
// const collection = await db.listCollections({ name: 'users' }).toArray();

// try {
//   await collection.insertOne([{ name: 'Aadil', age: 21 }]);
// } catch (err) {
//   console.log(err);
// }

client.close();
