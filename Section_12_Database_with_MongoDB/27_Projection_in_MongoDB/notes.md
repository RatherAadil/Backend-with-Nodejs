# What is Projection?

- Projection controls which fields are returned in the query result.

### Include Fields

- Include only "name" and "email"

```javascript
const users = await collection.find({}, { projection: { name: 1, email: 1 } });
```

### Exclude Fields

- Exclude "age"

```javascript
const users = await collection.find({}, { projection: { age: 0 } });
```

**Note**

- 1 = include, 0 = exclude
- You can't mix include and exclude (except for \_id).
