Here's how you can use `range` and `zip` functions with `for` loops in Python:

**1. `range` function:**

- **Purpose:** Generates a sequence of numbers, commonly used for iterating a specific number of times in a loop.
- **Syntax:** `range(start, stop, step)`
    
    - `start`: Starting number (inclusive, defaults to 0).
    - `stop`: Ending number (exclusive).
    - `step`: Increment between numbers (defaults to 1).
    

**Example:**

```
for i in range(5):  # Iterates from 0 to 4
    print(i)
```

**2. `zip` function:**

- **Purpose:** Combines elements from multiple iterables (like lists, tuples, strings) into pairs.
- **Syntax:** `zip(*iterables)`

**Example:**


```
numbers = [1, 2, 3]
letters = ['a', 'b', 'c']
for num, letter in zip(numbers, letters):
    print(f"{num} is paired with {letter}")
```

**Combining `range` and `zip`:**


```
for i, char in zip(range(4), "abcd"):  # Iterate over a string using range
    print(f"{i}: {char}")
```

**Key points:**

- `range` creates a sequence of numbers for iteration.
- `zip` pairs elements from multiple iterables.
- Combine them to iterate over multiple sequences in sync.

**Additional examples:**

- **Creating list of pairs with list comprehension:**
    
    
    ```
    pairs = [(num, letter) for num, letter in zip(numbers, letters)]
    ```
    
- **Using `zip` with different length iterables (stops at shortest):**
    
    
    ```
    longer_list = [4, 5, 6]
    for item in zip(numbers, letters, longer_list):
        print(item)  # Output: (1, 'a', 4) (2, 'b', 5) (3, 'c', 6)
    ```