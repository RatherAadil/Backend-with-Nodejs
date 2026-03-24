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
