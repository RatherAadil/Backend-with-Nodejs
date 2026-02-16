import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://127.0.0.1:27017/');

await client.connect();
const db = client.db('school');
const studentsCollection = db.collection('students');
const teachersCollection = db.collection('Teachers');

const result1 = await studentsCollection.insertOne({ name: 'aadil', age: 25 });
const result2 = await teachersCollection.insertMany([
  { name: 'Jhon', age: 40 },
  { name: 'Doe', age: 35 },
]);
console.log({ result1, result2 });
client.close();
