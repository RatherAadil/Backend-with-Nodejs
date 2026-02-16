# Create Operation in MongoDB

## Create Operation through GUI:

        -> Click '+' on Connection
        -> Enter DB name, Collection name.
        -> For creating document:
            -> Click on "Add Data" in Collection.
            -> You have 2 Options (import JSON or insert document)
            -> Write your data in JSON Format.

        -> It will store in the main Server.

## Create Operation through Shell:

        -> use <Database Name>
        -> db.<CollectionName>.insertOne(<Document>)
            It will create a collection and insert the data(document) in it.

        -> db.<CollectionName>.insertOne(<Documents>)
            It will create a collection and insert all the data(documents) in it.

- insertOne

```javascript
1. use expenseApp
2. db.expenses.insertOne({name:'aadil',age:25})
```

- insertMany

```javascript
db.expenses.insertMany({ name: 'aadil', age: 25 }, { name: 'abc', age: 50 });
```

## Access it thorugh Shell:

        -> db represent to the current database used.
        -> we can do db.<collectionName>.find()
            It will show all the available documents in it.
