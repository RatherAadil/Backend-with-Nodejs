import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://127.0.0.1:27017/');

await client.connect();
const db = client.db();

await db.command({
  collMod: 'users',
  validator: {
    $jsonSchema: {
      required: ['name', 'age'],
      properties: {
        _id: {
          bsonType: 'objectId',
        },
        name: {
          bsonType: 'string',
          maxLength: 30,
          minLength: 3,
        },
        age: {
          bsonType: 'int',
          maximum: 60,
        },
      },
      additionalProperties: false,
    },
  },
});

// const collection = await db.listCollections({ name: 'users' }).toArray();

client.close();
