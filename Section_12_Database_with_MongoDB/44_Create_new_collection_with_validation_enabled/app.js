import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://127.0.0.1:27017/');

await client.connect();
const db = client.db();

//CREATE COLLECTION WITH VALIDATION ENABLED (TWO WAYS)
// await db.command({
//   create: 'users',
//   validator: {
//     name: {
//       $type: 'string',
//     },
//     age: {
//       $type: 'int',
//       $gte: 18,
//       $lte: 60,
//     },
//   },
// });

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

// const collection = await db.listCollections({ name: 'users' }).toArray();

client.close();
