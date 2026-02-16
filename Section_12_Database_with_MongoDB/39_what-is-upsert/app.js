import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");

await client.connect();

const db = client.db();
const collection = db.collection("users");

const result = await collection.updateOne(
  { name: "Shyam" },
  { $set: { age: 1000 } },
  { upsert: true }
);

console.log(result);
client.close();
