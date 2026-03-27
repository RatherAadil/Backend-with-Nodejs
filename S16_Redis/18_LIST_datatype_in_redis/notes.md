# Redis Lists Datatype

A **Redis List** is an **ordered collection of strings**. It acts like a **linked list** and supports operations from both the **head (left)** and **tail (right)** ends.

You can use lists to implement any kind of queues and stacks.

### Common Commands:

```
    LPUSH mylist "a" → Add to left
    RPUSH mylist "b" → Add to right
    LPOP mylist → Remove from left
    RPOP mylist → Remove from right
    LRANGE mylist 0 -1 → Get all items
    LLEN mylist → List length
    LINDEX mylist 0 → Get item at inde
    LREM mylist 1 "a" → Remove item(s)
    LTRIM mylist 0 2 → Keep only index 0 to 2
```

## Node.js commands:

```js
await client.lPush('tasks', 'task1'); //-> it creates key named tasks and enter first value task1

await client.rPush('tasks', 'task2', 'task3'); //-> pushes from right

await client.lRange('tasks', 0, -1); //-> returns all tasks array

await client.lPop('tasks'); //-> pops from left

await client.rPop('tasks'); //-> pops from right

await client.lLen('tasks'); //-> return length of array
```
