# Keys vs Scan Command in Redis

In Redis, both `KEYS` and `SCAN` commands are used to search for keys. However, they are designed for very different purposes and have important performance and safety implications.

## `KEYS` Command

### Description:

- Returns **all keys** matching a given pattern.
- Example:

  ```bash
  KEYS user:*
  ```

### ✅ Pros:

- Simple to use.
- Good for **development** and **small datasets**.

### ❌ Cons:

- **Blocks the Redis server** while scanning all keys.
- Not safe in production for large datasets.
- Can cause significant performance issues.

### ⚠️ Use Case:

- Only in **development** or when you are absolutely sure the dataset is small.

## `SCAN` Command

### Description:

- Iteratively scans keys in **small batches** using a cursor.
- Non-blocking and safe for production.
- Example:

  ```bash
  SCAN 0 MATCH user:* COUNT 10
  ```

### ✅ Pros:

- **Non-blocking**, does not freeze Redis.
- Can be used safely in **production environments**.
- Allows partial, incremental scans.

### ❌ Cons:

- Requires cursor management (`do...while` or loop).
- Returns **partial results** per call (you must loop until cursor is `0`).

### ✅ Use Case:

- Scanning keys in **production**.
- Cleaning up expired or orphaned keys.
- Exporting or analyzing subsets of data.

## Final Recommendation

> Use `KEYS` only in controlled environments or development.
> Always prefer `SCAN` for safe, scalable key iteration in production systems.
