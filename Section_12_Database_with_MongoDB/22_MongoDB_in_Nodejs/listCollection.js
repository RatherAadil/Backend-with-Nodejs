import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://127.0.0.1:27017/');

await client.connect();
// const db = client.db();
const db = client.db('expenseApp');
// const collections = await db.listCollections().toArray();
// console.log(collections);

const collection = db.collection('expenses');
const expense = await collection.find().toArray();
console.log(expense);
