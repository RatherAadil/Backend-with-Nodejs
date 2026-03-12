# Update Operation in MongoDB

#### For updating a document we need to first find it.

        db.<Collection>.updateOne(findingObj, {$set: updateObj});

Eg.

```javascript
db.expenses.updateOne({ title: 'Grocery' }, { $set: { value: '20' } });
```

#### For replacing a document

        db.<Collection>.replaceOne(findingObj, replaceObj);

It will replace the whole object

#### UpdateMany documents

        db.<Collection>.updateMany(findingObj, {$set: { value: 240 } });

It will update all the available finded objects.
