import mongoose from 'mongoose';

console.log('Running userModel.js start');
const userModel = mongoose.model('User', { name: String, age: Number });
const data = await userModel.insertOne({ name: 'Zubair', age: '123' });
console.log(data);

console.log('Running userModel.js ');
