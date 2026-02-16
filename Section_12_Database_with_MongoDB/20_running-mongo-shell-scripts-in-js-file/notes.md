# Run JavaScript files using the Mongo shell:

```javascript
mongosh your_script.js
```

- Inside the JS file, write only valid JavaScript code using MongoDB API methods.

- Use` db.getCollection("name")` to access collections,if the collection is present it will provide that otherwise when the documents will be created inside the collection it will automatically create that collection.
