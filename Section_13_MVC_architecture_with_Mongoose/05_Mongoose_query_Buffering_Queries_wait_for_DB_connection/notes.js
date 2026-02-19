import mongoose from 'mongoose';
setTimeout(() => {
  const pro = mongoose.connect('mongodb://admin:admin@localhost');
  console.log('Database connection requested');

  pro.then(() => {
    console.log('Database Connected');
  });
}, 4000);

mongoose.set('autoCreate', false);
const userModel = mongoose.model('User', { name: String, age: Number });
console.log('Inserting Data');
const data = await userModel.insertOne({ name: 'Zubair', age: '123' });
console.log('Data Inserted');
console.log(data);
