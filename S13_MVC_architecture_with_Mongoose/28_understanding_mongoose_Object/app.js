import mongoose from 'mongoose';

mongoose.connect('mongodb://admin:admin@localhost');

mongoose.connection.on('connected', () => console.log('connected'));
mongoose.connection.on('open', () => console.log('open'));
mongoose.connection.on('disconnected', () => console.log('disconnected'));
mongoose.connection.on('reconnected', () => console.log('reconnected'));
mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
mongoose.connection.on('close', () => console.log('close'));

// const db = mongoose.connection.db;
// const fruitsCollection = db.collection('fruits');
// const result = await fruitsCollection.insertOne({ fruit: 'Mango' });
// console.log(result);
mongoose.disconnect();
