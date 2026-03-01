# What is a Session?

- A session is a way for a server to remember a user across multiple requests.
- It works by giving the client a unique ID, which helps the server recognize the user.
- There are two types of sessions based on how and where data is stored.

### Stateless Sessions (e.g., JWT):

    * All data is stored on the client.
    * Server is stateless.
    * ✅ Scalable
    * ❌ Cannot revoke easily, must protect the token

### Stateful Sessions (e.g., Session ID + server storage):

    * Data stored on the server (RAM, file, or database).
    * Client only holds a session ID.
    * Types:
        * In-memory: Fast, but lost on restart.
        * File-based: Persistent but slow.
        * Database-backed: Scalable and persistent (used in production).
