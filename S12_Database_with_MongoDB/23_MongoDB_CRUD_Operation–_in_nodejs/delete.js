import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient('mongodb://127.0.0.1:27017/');

await client.connect();
const db = client.db('school2');
const studentsCollection = db.collection('students');
const teachersCollection = db.collection('Teachers');

//DELETE COLLECTION
// const dropResult = await studentsCollection.drop();

//DELETE DOCUMENT (deleted via object id)
// const dropResult = await teachersCollection.deleteOne({
//   _id: new ObjectId('69897cff4f1412b03b6e1271'),
// });

//DELETE FIELD
// const dropResult = await teachersCollection.updateOne({
//   _id: new ObjectId('69897cff4f1412b03b6e1272'),
// },{$unset:{age:''}});

//DELETE DB
const deleteDBResult = await db.dropDatabase();

console.log({ deleteDBResult });
client.close();
