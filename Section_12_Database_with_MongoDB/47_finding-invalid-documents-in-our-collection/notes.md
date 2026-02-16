# For finding invalid document in collection

```javascript
db.collection("users").find({
$nor: [{ $jsonSchema: { ...your schema... } }]
});
```
