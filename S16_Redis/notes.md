# Introduction to Redis

- Redis (REmote DIctionary Server) is a fast, in-memory key-value store used as a database, cache, and message broker.
- It stores data in RAM, making reads/writes very fast.
- Supports different data types like strings, lists, hashes, sets, and more.

- Common use cases:
  - Session storage
  - Caching
  - Rate limiting
  - Message queues
  - Leaderboards

- It has features like:
  - Data persistence
  - Auto key expiration (TTL)
  - Pub/Sub messaging
  - Replication & clustering

* Widely used with Node.js and other backend systems for high-speed data tasks.

---

# Redis - Server, Client & GUI

- redis is not supproted for windows, use WSL for using redis.
- Run the following commands to download server & client of redis.

```bash
  curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg

  echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list

  sudo apt-get update
  sudo apt-get install redis
```

- After installing check the version of redis by:

```bash
  redis-server -v
  redis-cli -v
```

- Default port for redis is 6379
- For starting redis as a service:

```bash
  sudo service redis-server start
```

- For stopping redis as a service:

```bash
  sudo service redis-server stop
```

- For checking status:

```bash
  sudo service redis-server status
```

- redis commands are not case sensitive
- Redis insights GUI tool download.

---

# Redis Data Types Overview

Redis supports a variety of data types out of the box, along with several more through external modules. Here's a breakdown of both categories:

## ✅ Built-in Data Types (Out of the Box)

These data types are supported natively in Redis without any additional installation:

1. **Strings**
   - The most basic type; can hold any binary data (e.g., text, numbers, serialized JSON).

2. **Lists**
   - Ordered collection of strings; supports push/pop from both ends (like a queue or stack).

3. **Sets**
   - Unordered collection of unique strings.

4. **Hashes**
   - Field-value pairs, similar to JavaScript objects or Python dictionaries.

5. **Sorted Sets (ZSETs)**
   - Like sets, but each element is associated with a score, enabling sorting.

6. **Bitmaps**
   - Efficient way to store and operate on bits.

7. **Bitfields**
   - More advanced bit-level operations on binary strings.

8. **HyperLogLog**
   - Probabilistic data structure to estimate the cardinality (count of unique items).

9. **Streams**
   - Log-like data structure for message queues and real-time data ingestion.

10. **Pub/Sub Channels**

- Messaging system for broadcasting and subscribing to messages. It is not a data type rather it is a communication pattern.

## 📦 Additional Data Types via External Modules

These are not built-in to core Redis but can be enabled by installing **Redis modules**, often through **Redis Stack**:

1. **JSON** (via `RedisJSON`)
   - Store, query, and manipulate JSON documents natively.

2. **Time Series** (via `RedisTimeSeries`)
   - Optimized storage and querying of time-series data (e.g., metrics, sensors).

3. **Probabilistic Structures** (via `RedisBloom`)
   - Bloom Filters, Count-Min Sketch, Top-K, etc., for approximate set membership and frequency estimation.

4. **Full-Text Search and Secondary Indexes** (via `RediSearch`)
   - Index and search data using full-text queries, filtering, and scoring.

5. **Graph Data** (via `RedisGraph`)
   - Store and query data as nodes and relationships using Cypher query language.

6. **Geospatial Indexing** (extended via modules)
   - Native support exists for basic geospatial features; advanced indexing requires modules.

7. **Vector Similarity Search** (via `RedisVector` or Redis Stack's vector support)
   - Used for applications like recommendation systems and AI embeddings.

## 📌 Summary

| Category     | Data Types / Modules                                                                         |
| ------------ | -------------------------------------------------------------------------------------------- |
| Built-in     | Strings, Lists, Sets, Hashes, Sorted Sets, Bitmaps, Bitfields, HyperLogLog, Streams, Pub/Sub |
| With Modules | JSON, Time Series, Bloom, Count-Min, Full-Text Search, Graph, Vector, Geospatial (advanced)  |

Redis's modular architecture makes it highly adaptable, letting you go from a simple cache to a powerful data engine for modern applications.

---

# Redis String Commands

Redis strings are the most basic kind of Redis value. Below is a list of all commonly used Redis string commands.

## 🔹 SET Commands

### `SET key value`

Sets the value of a key.

```bash
SET name "Anurag"
```

### `SETNX key value`

Sets the key only if it does not already exist.

```bash
SETNX name "ProCodrr"
```

## 🔹 GET Commands

### `GET key`

Gets the value of a key.

```bash
GET name
```

### `GETRANGE key start end`

Gets a substring of the string stored at a key.

```bash
GETRANGE name 0 2  # "Anu"
```

### `GETSET key value`

Sets a new value and returns the old one.

```bash
GETSET name "ProCodrr"  # returns "Anurag"
```

## 🔹 Modification Commands

### `APPEND key value`

Appends a value to a string.

```bash
APPEND name " Singh"
```

### `STRLEN key`

Gets the length of the string value stored at a key.

```bash
STRLEN name
```

## 🔹 Numeric Operations

### `INCR key`

Increments the numeric value of a string by one.

```bash
INCR counter
```

### `INCRBY key increment`

Increments by a specific value.

```bash
INCRBY counter 10
```

### `DECR key`

Decrements the numeric value of a string by one.

```bash
DECR counter
```

### `DECRBY key decrement`

Decrements by a specific value.

```bash
DECRBY counter 5
```

### `INCRBYFLOAT key increment`

Increments the value by a floating point number.

```bash
INCRBYFLOAT balance 2.5
```

## 🗑️ Utility

### `DEL key`

Deletes a key (works for strings and all types).

```bash
DEL name
```

For a full reference, visit the [official Redis documentation](https://redis.io/commands/#string).

---

# Redis Expiry Commands

Redis allows setting expiry (TTL – Time To Live) for keys of any type, including strings. These commands can be categorized based on **when** you apply the expiry:

## 🟢 While Setting the Key

These commands **set the key and expiry in one step**.

### 🔹 `SET key value EX seconds`

Sets a string value and sets the expiration in seconds.

```bash
SET myKey "data" EX 60
```

### 🔹 `SET key value PX milliseconds`

Sets a string value and sets the expiration in milliseconds. The `P` stands for "precise" or "point-in-time".

```bash
SET myKey "data" PX 1500
```

### 🔹 `SETEX key seconds value`

Legacy version of `SET ... EX`. Only works with strings.

```bash
SETEX myKey 60 "data"
```

### 🔹 `PSETEX key milliseconds value`

Legacy version of `SET ... PX`. Only works with strings.

```bash
PSETEX myKey 1500 "data"
```

## 🔵 After the Key is Already Set

These commands **add or modify the expiry** of an existing key (any data type).

### 🔹 `EXPIRE key seconds`

Sets expiry in seconds.

```bash
EXPIRE myKey 60
```

### 🔹 `PEXPIRE key milliseconds`

Sets expiry in milliseconds.

```bash
PEXPIRE myKey 1500
```

### 🔹 `EXPIREAT key timestamp`

Sets expiry using a Unix timestamp (in seconds).

```bash
EXPIREAT myKey 1716459200
```

### 🔹 `PEXPIREAT key milliseconds_timestamp`

Sets expiry using a Unix timestamp (in milliseconds).

```bash
PEXPIREAT myKey 1716459200000
```

### 🔹 `TTL key`

Checks the time-to-live of a key (in seconds).

```bash
TTL myKey
```

### 🔹 `PTTL key`

Checks the time-to-live of a key (in milliseconds).

```bash
PTTL myKey
```

### 🔹 `PERSIST key`

Removes the expiry from a key, making it persistent.

```bash
PERSIST myKey
```

These commands work for **strings, hashes, lists, sets, sorted sets**, and all Redis key types.

For more info, visit the [Redis Expiration Documentation](https://redis.io/docs/latest/commands/expire/).

---

# Redis Database Management

View Total Databases

       CONFIG GET databases – Shows how many databases are configured (default is 16).

Switch Between Databases

       SELECT index – Switch to a database (e.g., SELECT 1 for DB 1).
       Databases are numbered from 0 to 15 by default.

Count Keys in a Database

      DBSIZE – Shows the number of keys in the current DB.
      redis-cli -n 2 DBSIZE – Check keys in a specific DB (DB 2 here).

Change Number of Databases

      Edit redis.conf:

      databases 4

      Limits Redis to databases 0–3.

Key Tips

- Only numbered databases (no names).
- All DBs share the same memory.
- No memory tracking per DB.

---

# 🗂️ Redis Key Namespacing

In Redis, **key namespacing** is a convention used to logically organize and group keys. Since Redis stores all keys in a flat keyspace (like a big global dictionary), it's up to the developer to structure key names in a meaningful way.

## 🔑 What is Key Namespacing?

Key namespacing is the practice of **prefixing keys** with a category or group name, typically separated by a colon `:`. This helps you:

- Organize data logically
- Avoid key collisions
- Enable efficient data access and cleanup

### 🔧 Common Pattern

```txt
<namespace>:<subcategory>:<identifier>
```

### 📌 Example

```txt
user:1001:name       # Name of user with ID 1001
user:1001:email      # Email of user with ID 1001
cart:1001:items      # Cart items of user 1001
session:abc123       # Session data
```

## 🎯 Benefits of Namespacing

| Benefit            | Description                                                    |
| ------------------ | -------------------------------------------------------------- |
| Organization       | Groups related keys together                                   |
| Easier Debugging   | Helps in inspecting keys in the CLI                            |
| Efficient Deletion | You can easily delete a group using `SCAN` + `DEL`             |
| Avoid Collisions   | Prevents accidental overwriting of keys from different domains |

## 🔍 Usage with Commands

### 🔹 Get all keys under a namespace

```bash
KEYS user:*
```

### 🔹 Delete all keys under a namespace (use with care)

```bash
SCAN 0 MATCH user:* COUNT 100
DEL <matched keys>
```

In practice, use `SCAN` to avoid blocking Redis in production environments.

## 💡 Best Practices

- Use clear, consistent prefixes (e.g., `user:`, `cart:`, `session:`)
- Use colons `:` as separators — this is a common Redis convention
- Don’t overuse deeply nested namespaces
- Use short, meaningful namespaces

## 🚫 Limitations

- Namespacing is **manual** — Redis doesn’t enforce it
- Requires discipline and consistency in your application code

---

# RedisJSON Datatype

## What is it?

    -> Lets you store and manage JSON data in Redis.
    -> Use commands like JSON.SET, JSON.GET.

## Common Commands:

**Set JSON:**

    JSON.SET user:1 $ '{"name":"Aadil","age":25}'

```js
const user = {
  username: 'Rather aadil',
  age: 25,
  email: 'imratheraadil@gmal.com',
};
const result = await redisClient.json.set('user:1', '$', user);
```

**Update Single Property**

```js
const result = await redisClient.json.set(
  'user:1',
  '$.username',
  'Zubair ahmad rather',
);
```

**Get JSON:**

    JSON.GET user:1          // Full JSON
    JSON.GET user:1 $.username   // ["Rather aadil"]

```js
const result = await redisClient.json.get('user:1', { path: '$.username' });
```

**Delete Field:**

    JSON.DEL user:1 $.location

```js
const result = await redisClient.json.del('user:1', {
  path: '$.age',
});
```

**Increment Number:**

    JSON.NUMINCRBY user:1 $.age 1

**Array Ops:**

    -> JSON.ARRAPPEND user:1 $.hobbies '"coding"'
    -> JSON.ARRPOP user:1 $.hobbies
    -> JSON.ARRLEN user:1 $.hobbies

**JSONPath Basics**

| JSONPath          | Meaning                                  |
| ----------------- | ---------------------------------------- |
| `$`               | Root of the JSON                         |
| `$.name`          | Property named `name`                    |
| `$.location.city` | Nested property `city` inside `location` |
| `$[*]`            | All items in an array                    |
| `$[0]`            | First item in an array                   |
| `$..name`         | All `name` fields at any depth           |

Note : JSONPath always returns arrays like ["Aadil"].

---

# Using redis for caching

**What:** Store API responses in Redis to serve repeated requests faster.

**Why:** Redis is fast (in-memory), supports TTL, and reduces DB load.

## How:

    Check Redis for cached data.
    If found → return it.
    If not → fetch from DB, store in Redis, then return.

## Key Features:

    Use unique cache keys (e.g., user:123)
    Set expiration (TTL)
    Invalidate cache when data changes

## Example:

    const cached = await client.get("key");
    if (cached) return JSON.parse(cached);
    // else fetch from DB and cache it

---

# Redis Search

Redis Search (RediSearch) allows full-text search and filtering on Redis JSON data using indexes.

## Index Types:

    TEXT → for searchable text (e.g. name)
    TAG → for exact matches (e.g. city, status)
    NUMERIC → for number ranges (e.g. age, price)
    GEO → Location-based queries (within radius, etc.)
    BOOLEAN (for Hash only as of now) → True/false values
    VECTOR → Index high-dimensional vectors for similarity search

## Example: Create Index on JSON

    FT.CREATE userIdx ON JSON PREFIX 1 user: SCHEMA $.name AS name TEXT $.city AS city TAG $.age AS age NUMERIC

    -> userIdx: index name
    -> PREFIX 1 user:: targets keys starting with user:
    -> Indexes name as TEXT, city as TAG, age as NUMERIC

## Search Examples:

    -> Exact match (city):
        FT.SEARCH userIdx "@city:{Delhi}"

    -> Age ≥ 28:
        FT.SEARCH userIdx "@age:[28 +inf]"

    -> Full-text name search:
        FT.SEARCH userIdx "@name:Sahil"

## Other Commands:

    -> FT._LIST → list all indexes
    -> FT.INFO userIdx → view index info
    -> FT.DROPINDEX userIdx → delete index only
    -> FT.DROPINDEX userIdx DD → delete index + data

# Nodejs code examples

```ts
import { createClient, SCHEMA_FIELD_TYPE } from 'redis';

const redisClient = createClient();
await redisClient.connect();

// 📌 Check Existing Indexes
const indexes = await redisClient.ft._list();
console.log(indexes);

// 📋 Get Information About an Index
const indexInfo = await redisClient.ft.info('cityIdx');
console.log(indexInfo);

// 📌 Create Indexes for JSON Data

// 🔹 Index on `city` field (as TAG)
await redisClient.ft.create(
  'cityIdx',
  {
    '$.city': { type: SCHEMA_FIELD_TYPE.TAG, AS: 'city' },
  },
  {
    ON: 'JSON',
    PREFIX: 'user:',
  },
);

// 🔹 Index on `age` field (as NUMERIC)
await redisClient.ft.create(
  'ageIdx',
  {
    '$.age': { type: SCHEMA_FIELD_TYPE.NUMERIC, AS: 'age' },
  },
  {
    ON: 'JSON',
    PREFIX: 'user:',
  },
);

// 🔹 Index on `name` field (as TEXT)
await redisClient.ft.create(
  'nameIdx',
  {
    '$.name': { type: SCHEMA_FIELD_TYPE.TEXT, AS: 'name' },
  },
  {
    ON: 'JSON',
    PREFIX: 'user:',
  },
);

// 🔍 Searching with Redis (Node.js)

// 🔸 Search by City (exact match)
const citySearch = await redisClient.ft.search('cityIdx', '@city:{Delhi}');
console.log(citySearch);

// 🔸 Search Users by Exact Age
const exactAgeSearch = await redisClient.ft.search('ageIdx', '@age:[25 25]');
console.log(exactAgeSearch);

// 🔸 Search Users with Age Greater Than or Equal to 28
const gteAgeSearch = await redisClient.ft.search('ageIdx', '@age:[28 +inf]');
console.log(gteAgeSearch);

// 🔸 Search Users with Age Less Than 28
const ltAgeSearch = await redisClient.ft.search('ageIdx', '@age:[-inf (28]');
console.log(ltAgeSearch);

// 🔸 Search by Name (full-text)
const nameSearch = await redisClient.ft.search('nameIdx', '@name:Kumar');
console.log(nameSearch);

// 🔸 Get Only the Matched Count
const result = await redisClient.ft.search('nameIdx', '@name:Kumar', {
  LIMIT: {
    from: 0,
    size: 0,
  },
});
console.log(result);

// 🔸 Get the Selected Fields (It will work only for the field on which the search is being performed.)
const selectedResult = await redisClient.ft.search('nameIdx', '@name:Kumar', {
  RETURN: ['name'],
});

console.log(selectedResult);

// ❌ Drop an Index

// 🔹 Drop Index Only (keep documents)
await redisClient.ft.dropIndex('nameIdx');

// 🔹 Drop Index and Delete Documents
await redisClient.ft.dropIndex('ageIdx', { DD: true });
```
