# Delete Operation in MongoDB

#### Delete a Property:

- We cannot delete/Update \_id

```javascript
db.expenses.updateOne({ title: 'Grocery' }, { $unset: { value: '' } });
```

- It will delete the value property from that document

#### Delete a Document:

```javascript
db.expenses.deleteOne({ title: 'Grocery' });
```

- It will find the document and delete it

#### Delete a Collection:

```javascript
 db.<collectionName>.drop()
```

- It will delete the collection

#### Delete a Database:

- For deleting we should be in the database.

```javascript
db.dropDatabase();
```

- It will delete all the collections, document inside the DB
