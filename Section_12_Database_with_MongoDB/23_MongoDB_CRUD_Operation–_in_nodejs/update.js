import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient('mongodb://127.0.0.1:27017/');

await client.connect();
const db = client.db('school');
const studentsCollection = db.collection('students');
const teachersCollection = db.collection('Teachers');

//UPDATE ONE (using updateOne())
// const updateResult = await studentsCollection.updateOne(
//   {
//     _id: new ObjectId('69897c1d5c508b58d8ad2370'),
//   },
//   { $set: { class: 'PG', age: 25 } },
// );

//REPLACE
const updateResult = await studentsCollection.replaceOne(
  {
    _id: new ObjectId('69897c1d5c508b58d8ad2370'),
  },
  { class: 'PG', age: 25, cgpa: 9 },
);

console.log({ updateResult });
client.close();
