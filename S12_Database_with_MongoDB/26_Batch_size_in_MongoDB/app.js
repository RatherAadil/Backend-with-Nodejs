import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://127.0.0.1:27017/');

await client.connect();
const db = client.db('expenseApp');
const collection = db.collection('expenses');

const cursor = collection.find().batchSize(10);

const data = await cursor.toArray();
console.log(data.map(({ title, amount }) => ({ title, amount })));
client.close();
