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

---

# What is SOP?

- A browser security feature that restricts how scripts from one origin can access data from another origin.

## What is an Origin?

    * Defined as: Protocol + Hostname + Port
    * Any change in these three makes it a different origin.

## What SOP Blocks:

    * Reading cookies, localStorage, or sessionStorage of another origin.
    * Reading the response body of cross-origin fetch() or XMLHttpRequest.
    * Accessing DOM of a cross-origin iframe.

## What SOP Allows:

    * Sending requests to other origins (e.g., fetch, <img>, <script>).
    * Loading images, styles, scripts, and fonts from other origins (read-only).
    * Embedding content in cross-origin iframes (no access to internal content).

## Why SOP Exists:

    * To protect users from malicious websites trying to steal data from other sites (like your bank or email).
    * Prevents cross-site attacks like CSRF and data theft.

## Who Enforces SOP?

    * The browser, automatically and always enabled.

## Can You Disable SOP?

    * No. SOP is enforced in all modern browsers and cannot be turned off.

## How to Allow Cross-Origin Access (Safely):

    * Use CORS (Cross-Origin Resource Sharing) — configured on the server.
    * Use postMessage API — for secure communication between iframes/windows.

---

# What is XSS?

Cross-Site Scripting (XSS) is a vulnerability where attackers inject malicious JavaScript into a web page, which then runs in the browser of other users.

## Why It’s Dangerous ?

- Can steal cookies, sessions, and sensitive data
- Can impersonate users or perform actions on their behalf
- May lead to account takeovers or site defacement

## How It Happens ?

- A site displays user input (like a comment or form value) without sanitizing it
- The attacker injects a script
- Other users visiting that page run the script unknowingly

## How to Prevent It ?

- Sanitize or escape all user input
- Use tools like DOMPurify
- Avoid unsafe methods like innerHTML, eval, etc.
- Use Content Security Policy (CSP) to block unwanted scripts

---

# XSS Sanitization with DOMPurify

`Why?` To protect against XSS, always sanitize HTML from users or backend before rendering.

`Tool:` Use dompurify for sanitizing HTML.

## Server-Side (Node.js)

    -> Needs a DOM-like environment → install jsdom.
    -> Eg:
        import createDOMPurify from 'dompurify';
        import { JSDOM } from 'jsdom';

        const DOMPurify = createDOMPurify(new JSDOM('').window);
        const clean = DOMPurify.sanitize(dirtyHTML);

## Client-Side (React)

    -> Directly use dompurify to sanitize and safely render HTML:
    -> Eg:
        import DOMPurify from 'dompurify';

        const SafeHTML = ({ html }) => (
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />
        );

---

# Types of XSS Attack

Cross-Site Scripting (XSS) allows attackers to inject malicious JavaScript into a webpage. There are 4 main types:

## Stored XSS (Persistent)

    -> Script is saved on the server (e.g., in a comment)
    -> Runs for every user who views it
    -> 🔥 High risk

## Self-XSS

    -> Attacker tricks user into pasting code in their browser console
    -> ⚠️ Medium risk

## Reflected XSS (Non-Persistent)

    -> Script comes from the URL or form and reflects in the response
    -> Runs immediately when the page loads
    -> ⚠️ Medium–High risk

## DOM-Based XSS

    -> Happens in client-side JavaScript (e.g., from innerHTML)
    -> No server involved
    -> ⚠️ Medium–High risk

---

# What is CSP?

    -> Content Security Policy (CSP) is a security feature that controls what content (scripts, styles, images, etc.) your website is allowed to load. It helps protect against XSS, clickjacking, and code injection.

## Why Use It?

    -> Blocks untrusted scripts and resources
    -> Prevents inline script execution
    -> Reduces risk of browser-based attacks

## How to Use

    -> Set CSP via HTTP headers or <meta> tags:
        Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted.com

## Best Practices

    -> Use 'self' for trusted sources
    -> Avoid 'unsafe-inline' and 'unsafe-eval'
    -> Use nonces or hashes for inline scripts
    -> Set frame-ancestors 'none' to block iframes

### Example (Meta Tag):

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self'"
/>
```

## 🧩 Key CSP Directives

| Directive         | Description                                                   |
| ----------------- | ------------------------------------------------------------- |
| `default-src`     | Fallback for all other resource types (scripts, styles, etc.) |
| `script-src`      | Allowed sources for JavaScript                                |
| `style-src`       | Allowed sources for CSS                                       |
| `img-src`         | Allowed sources for images                                    |
| `font-src`        | Allowed sources for fonts                                     |
| `connect-src`     | Controls where `fetch`, `XHR`, WebSockets can connect         |
| `frame-ancestors` | Restricts which domains can embed the page in an iframe       |
| `object-src`      | Controls loading of plugins like Flash (mostly obsolete)      |
| `media-src`       | Controls audio/video sources                                  |

## 🚨 Dangerous Sources to Avoid

| Source            | Why It's Dangerous                                             |
| ----------------- | -------------------------------------------------------------- |
| `'unsafe-inline'` | Allows inline scripts/styles, defeats CSP's XSS protection     |
| `'unsafe-eval'`   | Allows `eval()` and similar, risky execution of arbitrary code |

> Only use these in development or when absolutely necessary with strong justification.

## ✅ Recommended Practices

- Always define a **strict `default-src`**
- Use `'self'` wherever possible (means same-origin)
- Avoid `'unsafe-inline'` and `'unsafe-eval'`
- Use **nonces** or **hashes** for inline scripts if needed
- Define `frame-ancestors 'none'` to block clickjacking

## 🔍 Example: Strict CSP Header

```http
Content-Security-Policy: \
  default-src 'self'; \
  script-src 'self' https://cdn.example.com; \
  style-src 'self' https://fonts.googleapis.com; \
  img-src 'self' data:; \
  font-src 'self' https://fonts.gstatic.com; \
  connect-src 'self'; \
  frame-ancestors 'none';
```

## 🧪 Testing Your CSP

- Use browser dev tools → Network tab → check for CSP headers
- Tools:
  - [Google CSP Evaluator](https://csp-evaluator.withgoogle.com/)

## ⚠️ Common Mistakes

- Overusing `'unsafe-inline'` or `'unsafe-eval'`
- Not testing third-party integrations (CDNs, analytics)
- Setting CSP via meta tags only — headers are preferred

## 🧰 Tools and Libraries

- `helmet` (for Express.js):

  ```js
  import helmet from 'helmet';
  app.use(helmet());
  ```

- Online CSP generators
- Security scanners like Mozilla Observatory

## 📦 CSP Reporting

You can ask browsers to send violation reports:

```http
Content-Security-Policy-Report-Only: default-src 'self'; report-uri /csp-violation-report-endpoint
```

## Summary

    CSP adds a strong layer of protection to your website by allowing only safe content to run. It’s one of the easiest ways to defend against common web attacks.

> "Don't wait for a breach to enforce your content boundaries. CSP is your first line of browser defense."

---

# Reporting CSP

### 1. Add Reporting in CSP Header

```ts
- Use report-uri or report-to:
- Content-Security-Policy: default-src 'self'; report-uri /csp-report
```

### 2. Browser Sends Violation Reports

```
Sends JSON to your endpoint when a CSP rule is violated.
```

### 3. Create Server Endpoint to Receive Reports

```ts
   Example (Express.js):

   app.post('/csp-report', express.json({ type: "application/csp-report"}), (req, res) => {
   console.log(req.body);
   res.sendStatus(204);
   });
```

---

# Using inline scripts with hash

### 1. Write the Inline Script

```js
<script>console.log("Hello CSP!");</script>
```

### 2. Generate SHA-256 Hash

In Node.js:

```ts
crypto
  .createHash('sha256')
  .update('console.log("Hello CSP!");')
  .digest('base64');
```

### 3. Add Hash to CSP Header

```ts
Content-Security-Policy: script-src 'self' 'sha256-<your-hash>';
```

### 4. Keep Script Exactly the Same

Even a small change breaks the hash match.
