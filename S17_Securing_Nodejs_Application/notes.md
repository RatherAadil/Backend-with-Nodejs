# Why Web Security Is Important

- Web apps often handle private data like passwords, emails, and money details. If the app is not secure, hackers can steal data, cause damage, and break user trust.

- Why You Should Care About Security

```
    -> Keep user data safe
    -> Stop hackers from breaking in
    -> Keep your website running smoothly
    -> Follow rules and laws (like GDPR)
    -> Protect your brand’s reputation
```

## Common Dangers to Web Apps:

    -> SQL Injection – Hacker tricks the database using bad input.
       Fix: Use safe database queries.

    -> XSS (Cross-Site Scripting) – Bad scripts are run in the browser.
       Fix: Clean user input.

    -> CSRF – User is tricked into doing something without knowing.
       Fix: Use CSRF tokens.

    -> Weak Login Systems – Easy-to-guess passwords or session hacks.
       Fix: Use strong logins and 2FA.

    -> IDOR – Accessing other people’s data by changing URLs.
       Fix: Check user access for every request.

    -> Sensitive Data Leaks – Data is not encrypted or logged by mistake.
       Fix: Use HTTPS and encryption.

    -> Bad Settings – Default passwords, open ports, etc.
       Fix: Configure servers properly and update them.

    -> DoS/DDoS Attacks – Overloading the server so it crashes.
       Fix: Use rate limits and traffic filters.

    -> Old Libraries – Using code with known bugs.
       Fix: Update dependencies often.

    -> No Monitoring – Attacks go unnoticed.
       Fix: Add logs and alerts.

---

# Understanding .env File Support in Node.js

## What is a .env File?

A `.env` file is a plain text file used to store environment variables. These variables can define things like:

- API keys
- Database URLs
- Application ports

Each line in a `.env` file typically looks like:

```env
KEY=VALUE
```

This is useful for managing sensitive or environment-specific configuration without hardcoding them into your source code.

## Traditional Approach (Before Node.js v20.6.0)

Before Node.js v20.6.0, environment variables from a `.env` file were not loaded automatically. Developers used the `dotenv` package to load these values:

```bash
npm install dotenv
```

In your JavaScript file:

```js
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.MY_SECRET);
```

## Native .env Support in Node.js (v20.6.0+)

Starting from **Node.js v20.6.0**, native support for `.env` files was introduced.

### 🔹 How It Works

Node.js can now load `.env` files natively using CLI flags:

```bash
node --env-file=.env app.js
```

You can also load multiple `.env` files:

```bash
node --env-file=.env --env-file=.env.development app.js
```

To load a file only if it exists (and avoid errors):

```bash
node --env-file-if-exists=.env app.js
```

## ⚙️ File Format

The file must follow INI-style formatting with one `KEY=VALUE` pair per line:

```env
PORT=3000
DB_URL=mongodb://localhost/mydb
```

### ✅ Multiline Support

As of Node.js v22.9.0, multi-line values are supported when using the `--env-file` flag. Use quotes to wrap multi-line content:

```env
MULTI_LINE="This is
a multiline
value"
```

This results in a single value with embedded `
` characters.
env
PORT=3000
DB_URL=mongodb://localhost/mydb

## Example

**.env**

```env
PORT=3000
DB_URL=mongodb://localhost/test
```

**Command to Run**

```bash
node --env-file=.env app.js
```

**app.js**

```js
console.log(process.env.PORT); // Outputs: 3000
```

---

# SQL Injection / NoSQL Injection

Even though MongoDB doesn’t use SQL, it can still be hacked if you don’t handle user input properly. This is called NoSQL Injection.

## What Can Go Wrong?

- If you directly use user input in a query, a hacker can trick the database.
- Example (Bad code):

```js
User.findOne({ email: req.body.email, password: req.body.password });
```

- If someone sends special values like `{ email: { $ne: null }, password: { $ne: null } }`
- Matches all users → login bypass i,e they can log in without the correct password.

## How to Stay Safe

- Use validations – It checks that the input is in the right format.
- Check user input – Make sure it's a string and not an object.
- Don’t use raw JSON from users – Never trust JSON objects in requests.

---

# Zod

Zod is a JavaScript/TypeScript library used to check and validate data (like form inputs or API requests).

Why Use Zod?

```
-> Makes sure data is in the correct format
-> Works great with TypeScript
-> Easy to use and fast
-> Catches invalid or missing data early
```

Example:

```js
const userSchema = z.object({
  name: z.string(),
  age: z.number(),
});
```

- Then you can validate data like this:

```js
userSchema.parse({ name: 'Aadil', age: 22 }); // ✅ Valid
userSchema.parse({ name: 'Aadil', age: 'twenty' }); // ❌ Error
```

## safeParse in Zod:

- safeParse is a method in Zod that lets you validate data safely without crashing your app.
- How it Works:

```
  Returns an object with { success: true, data } if valid
  Returns { success: false, error } if invalid
```

- Example:

```js
const result = userSchema.safeParse({ name: 'Aadil', age: 'twenty' });

if (result.success) {
  console.log('✅ Valid:', result.data);
} else {
  console.log('❌ Error:', result.error.issues);
}
```

## Another example:

```js
const userSchema = z.object({
  name: z
    .string()
    .min(3, 'Please enter at least 3 characters')
    .max(50, 'Please enter at max 50 characters.'),
  email: z.email().optional(),
  otp: z
    .string()
    .min(4)
    .max(4)
    .regex(/^\d{4}$/, 'Please enter a valid 4 digit number'),
});

const user = { name: 'aadil', email: '@gmail.com', otp: '1234' };
const sanitizeData = userSchema.safeParse(user);
if (sanitizeData.success) {
  console.log(sanitizeData.data);
} else {
  console.log(sanitizeData.error.issues);
}
```
