# jsonSchema Validation

- Defines strict structure, data types, and rules for documents.
- Supports nested validation.
- ` additionalProperties:` false blocks extra unwanted fields.

* usually we add this validation using mongosh as we store this only one time

Example with Nested Fields:

```javascript
db.createCollection('users', {
  validator: {
    $jsonSchema: {
      required: ['name', 'age', 'address'],
      additionalProperties: false,
      properties: {
        name: { bsonType: 'string' },
        age: { bsonType: 'int', minimum: 18 },
        address: {
          bsonType: 'object',
          required: ['city', 'zip'],
          additionalProperties: false,
          properties: {
            city: { bsonType: 'string' },
            zip: { bsonType: 'int' },
          },
        },
      },
    },
  },
});
```
