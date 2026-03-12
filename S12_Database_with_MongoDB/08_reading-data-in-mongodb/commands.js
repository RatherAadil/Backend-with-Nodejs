db.expenses.find()
db.expenses.find({currency: 'INR'})
db.expenses.find({currency: 'USD'}) 
db.expenses.find({currency: 'USD', paymentMethod: 'Debit Card'}) 
db.expenses.findOne({currency: 'USD', paymentMethod: 'Debit Card'}) 
db.expenses.findOne().constructor.name
db.expenses.find({amount: {$gt: 200}})
db.expenses.find({amount: {$gte: 200}})
db.expenses.find({amount: {$lte: 200}})