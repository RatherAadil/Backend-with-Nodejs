import mongoose from 'mongoose';
await mongoose.connect('mongodb://admin:admin@localhost');
console.log('Database connected');

mongoose.set('autoCreate', false);
const userModel = mongoose.model('User', { name: String, age: Number });
const data = await userModel.insertOne({ name: 'aadil', age: '123' });
console.log(data);
