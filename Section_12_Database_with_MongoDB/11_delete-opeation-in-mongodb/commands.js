db.expenses.updateOne({name: 'Anurag'}, {$unset: {name: ''}});
db.expenses.updateOne({_id: ObjectId('678d78869bbc3c393bcb0d15')}, {$unset: {_id: ''}});
db.expenses.deleteOne({_id: ObjectId('678d78869bbc3c393bcb0d15')});
db.expenses.deleteMany({title: 'Electricity bill'}); 
db.fruits.insertOne({ name: 'Orange' })
db.users.drop()
db.dropDatabase()