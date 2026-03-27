# What is a Redis Hash?

- A Redis Hash is like a JavaScript object — it stores field-value pairs under one key.
  Great for user data, settings, or structured records.

Common Commands

```
    HSET userHash name "Alice" age "25" → Add/set fields
    HGET userHash name → Get value of one field
    HGETALL userHash → Get all fields and values
    HMGET userHash name age → Get multiple values
    HDEL userHash age → Delete a field
    HEXISTS userHash name → Check if field exists
    HLEN userHash → Count fields
    HKEYS userHash → List all field names
    HVALS userHash → List all values
    HINCRBY userHash age 1 → Increment a number field
```
