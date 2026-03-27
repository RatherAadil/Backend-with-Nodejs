# Fuzzy search

- Fuzzy search = approximate string matching
- matches words even with typos / small edits

Example

```bash
FT.SEARCH cityIdx "%banglore%"
```

Matches: bangalore, banglore, bangalor

### Used for:

User input, Typos, Search bars, Names, cities, products

### Exact OR search

Example 1:

```bash
FT.SEARCH cityIdx "@city:{pune|delhi}"
```

- {} → TAG match
- | → OR
- return Exact matches, ordered, fast

Example 2:

```bash
FT.SEARCH cityIdx "@city:"-pune|delhi"
```

return all matches excluding these two

### why and what to use when?

- TAG → filtering (cities, status, category)
- TEXT → searching (names, descriptions)
- Fuzzy → forgiveness, not logic

## What is pagination?

Pagination = returning data in small chunks (pages) instead of everything at once.

Exapmle: `OFFSET 20 LIMIT 10`

- Prefix match

```bash
FT.SEARCH cityIdx "@city:pun\*"
```

Matches any city that starts with pun.

## Nodejs

```js
// Node.js equivalents of Redis Search commands
import { createClient } from 'redis';

const client = createClient();
await client.connect();

// 🔎 Fuzzy Search (Approximate Matching)
await client.ft.search('userIdx', '%Kumar%');

// 🌠 Search by Any Word (Logical OR)
await client.ft.search('userIdx', 'Bhupesh|Sahil');

// 📃 Paging Results (Pagination)
await client.ft.search('userIdx', 'Delhi', {
  LIMIT: {
    from: 10,
    size: 5,
  },
});

// 🚫 Excluding Words from Search
await client.ft.search('userIdx', '-Sanat');

// 🔠 Partial Word Search
// Prefix Match
await client.ft.search('userIdx', 'Kum*');

// Suffix Match
await client.ft.search('userIdx', '*mar');

// Specific Suffix Match
await client.ft.search('userIdx', '*maar');

// Disconnect when done
await client.quit();
```
