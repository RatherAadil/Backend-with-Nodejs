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
