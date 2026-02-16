import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://127.0.0.1:27017/');

await client.connect();
const db = client.db('todos');
const collection = db.collection('todo');

//Cursor is an object in the eyes of JS
const cursor = collection.find();

//Count documents
console.log(await collection.countDocuments());

// for await (const document of cursor) {
//   console.log(document);
// }

//NEXT METHOD ( To get a next single document)
// console.log(await cursor.next());
// console.log(await cursor.next());
// console.log(await cursor.next());

//hasNext() Method

// console.log(await cursor.hasNext());

// let count = 0;
// while (await cursor.hasNext()) {
//   count++;
//   console.log(await cursor.next());
//   if (count === 5) break;
// }

client.close();
