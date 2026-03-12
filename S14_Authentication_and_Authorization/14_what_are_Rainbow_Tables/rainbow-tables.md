## 🌈 Rainbow Tables — Short Summary

- A **Rainbow Table** is a precomputed list of common passwords and their hash values (e.g., using SHA-256).
- A **Rainbow Table Attack** uses this table to quickly match a stolen password hash to its original plaintext password.
- It only works effectively if:
  - The hash algorithm is known.
  - **No salt** was used.

### Prevention

- Use a **unique salt** per password.
- Use slow password-hashing algorithms (KDFs) like bcrypt, Argon2, scrypt, or PBKDF2.
- Avoid fast hashes like MD5 or plain SHA-256 for storing passwords.

**Bottom line:** Salt + slow hashing = strong defense against rainbow table attacks.

## Rainbow Table (SHA-256)

| Plaintext | SHA-256 Hash                                                       |
| --------- | ------------------------------------------------------------------ |
| password  | `5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8` |
| 1234      | `03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4` |
| qwerty    | `65e84be33532fb784c48129675f9eff3a682b27168c0ea744b2cf58ee02337c5` |
| letmein   | `1c8bfe8f801d79745c4631d09fff36c82aa37fc4cce4fc946683d7b336b63032` |
| admin     | `8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918` |
| welcome   | `280d44ab1e9f79b5cce2dd4f58f5fe91f0fbacdac9f7447dffc318ceb79f2d02` |
| ninja     | `54482595177116e6103b076dbf30648e5d0537dd1ed9cf5ae4562fa8a700d47b` |
| abc123    | `6ca13d52ca70c883e0f0bb101e425a89e8624de51db2d2392593af6a84118090` |
| iloveyou  | `e4ad93ca07acb8d908a3aa41e920ea4f4ef4f26e7f86cf8291c5db289780a5ae` |
| football  | `6382deaf1f5dc6e792b76db4a4a7bf2ba468884e000b25e7928e621e27fb23cb` |

## 🌐 Popular Websites to Crack Hashes

Here are three popular websites that can help crack hash values:

1. **[CrackStation](https://crackstation.net/)** — A powerful online hash cracker with a large lookup table (15GB+). Supports MD5, SHA1, SHA256. Easy to use and fast for common hashes.

2. **[Hashes.com](https://hashes.com/)** — A community-driven hash cracking service. You can upload hash lists, and it will try cracking using a massive collection of known hashes.
