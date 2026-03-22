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
