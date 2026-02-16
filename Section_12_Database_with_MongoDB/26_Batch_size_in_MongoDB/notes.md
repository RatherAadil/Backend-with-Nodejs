**MongoDB Batch** means a _chunk of documents_ sent from the server to the client at a time.

- MongoDB does **not** return all query results at once
- It creates a **cursor** and sends data in **batches**

## What is Batch Size?

- MongoDB returns documents in batches, not all at once.
- Batch size controls how many docs are returned per network request.

### Set Batch Size

```javascript
const cursor = collection.find().batchSize(10);
```

- This sets the batch size to 10 documents.
- MongoDB will send results in chunks of 10 until all are returned.

**Notes**> Improves memory usage and performance for large datasets.
