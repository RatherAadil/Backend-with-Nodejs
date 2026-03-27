# What is a Redis Set?

```
-> A set of unique, unordered strings
-> Great for: tags, unique users, membership checks
-> Fast operations: add, remove, check in O(1) time
```

## Common Commands

    SADD myset "apple" "banana" → Add items
    SREM myset "banana" → Remove item
    SMEMBERS myset → Get all items
    SISMEMBER myset "apple" → Check if exists (1 or 0)
    SCARD myset → Count elements
    SPOP myset → Remove & return random item
    SRANDMEMBER myset → Get random item (without removing)

## NODE.JS commands

```js
await client.sAdd('skills', 'node'); // creates set "skills" and adds "node"

await client.sAdd('skills', 'redis', 'docker'); // adds multiple unique values

await client.sMembers('skills'); // returns all members as array

await client.sIsMember('skills', 'node'); // returns true if "node" exists

await client.sRem('skills', 'docker'); // removes "docker" from set

await client.sCard('skills'); // returns total number of members

await client.sUnion('set1', 'set2'); // returns all unique members from both sets

await client.sInter('set1', 'set2'); // returns members present in both sets

await client.sDiff('set1', 'set2'); // returns members in set1 but not in set2
```
