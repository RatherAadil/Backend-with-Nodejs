import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");

await client.connect();

const db = client.db();
const collection = db.collection("users");

const result = await collection.insertMany(
  [
    { name: "Shyam", _id: new ObjectId("67aef015d7575f64da478850") },
    { name: "Raman" },
    { name: "Hari" },
  ],
  { ordered: false }
);

console.log(result);

// const data = await collection.find().toArray();
// console.log(data);
client.close();
