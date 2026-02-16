import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://127.0.0.1:27017/');

await client.connect();
const db = client.db('expenseApp');
const collection = db.collection('expenses');

const cursor = collection
  .find()
  .skip(1)
  .limit(0)
  .sort({ title: 1 })
  .filter({ category: 'Books' });
const data = await cursor.toArray();
console.log(data.map(({ title, amount }) => ({ title, amount })));
client.close();
