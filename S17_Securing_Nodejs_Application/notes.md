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

---

# What is Clickjacking?

    Clickjacking (short for click hijacking) is a malicious technique where an attacker tricks a user into clicking on something different from what they perceive.

    It usually involves embedding a legitimate website (like a banking site, “Like” button, or video player) inside an invisible or disguised frame (<iframe>), so when the user clicks, they are actually interacting with the attacker’s chosen target.

    👉 In simple words: You think you’re clicking a harmless button, but you’re actually clicking something hidden.

## Clickjacking Works

    -> Attacker sets up a malicious webpage.

    -> On this page, they load the victim’s site (like a bank transfer form, or social media “Like” button) inside a transparent iframe.

    -> The iframe is positioned so that when the user clicks a visible button on the attacker’s page, they are unknowingly clicking the hidden iframe element.

    -> The attacker manipulates the action – e.g., transferring money, liking a page, or enabling webcam permissions.

## Real-World Examples of Clickjacking

    -> Facebook Likejacking (2010s)
    Attackers tricked users into “liking” pages by hiding the Facebook Like button under fake video play buttons. This boosted the popularity of pages without the user’s consent.

    -> Twitter Tweetjacking
    Some websites made users unknowingly tweet links by overlaying invisible tweet buttons.

    -> Banking Fraud
    A user might be tricked into clicking a hidden "Transfer Money" button on their bank site while believing they are playing a game or pressing another button.

    -> Adobe Flash Camera/Microphone Settings (2008)
    Attackers exploited clickjacking to make users enable their webcam/microphone without realizing it.

## How to Prevent Clickjacking

    For Developers / Website Owners

    1) X-Frame-Options HTTP Header

        DENY → Page cannot be displayed in a frame.
        SAMEORIGIN → Page can only be displayed in a frame on the same origin.
        ALLOW-FROM https://example.com/ → Allow framing only from a trusted domain.

    2) Content-Security-Policy (CSP) with frame-ancestors:

        Content-Security-Policy: frame-ancestors 'self' https://trusted.com
        More flexible and modern replacement for X-Frame-Options.

    3) Frame Busting Scripts (legacy, less reliablem, older method)

        JavaScript to detect if a page is inside a frame and break out:

        if (top !== self) {
            top.location = self.location;
        }

    For Users:
        -> Use updated browsers (modern browsers block many iframe exploits).
        -> Use browser extensions like NoScript or uBlock Origin that block clickjacking attempts.
        -> Avoid clicking on suspicious links and “free” video play buttons.

---

# Understanding the `domain` Attribute in Cookies

The `domain` attribute in cookies controls **which hosts (domains or subdomains)** the browser should send the cookie to. It helps define the **scope of visibility** for that cookie.

## How It Works

When a cookie is set without a `domain` attribute, it is **only sent to the origin (host)** that set it.

But when a `domain` is specified:

- The cookie becomes available to **that domain and all its subdomains**.

### Examples

### 1. No `domain` attribute

```js
res.cookie('sid', '12345');
```

- Scope: Only sent to requests from the exact domain that set it (e.g. `www.example.com`)
- Not sent to subdomains like `api.example.com`

### 2. With `domain` set

```js
res.cookie('sid', '12345', { domain: '.example.com' });
```

- Scope: Sent to `example.com`, `api.example.com`, `www.example.com`, etc.
- **Note**: The dot (`.`) before the domain allows subdomain access.

## Special Case: `localhost`

`localhost` is **not a valid domain name**, and behaves differently:

- Setting `domain: "localhost"` **may not work** or may be ignored by modern browsers.
- You **cannot** set `domain: ".localhost"` to include `www.localhost` or `xyz.localhost` — they are treated as separate origins.
- Best practice: **omit the `domain` field** entirely for `localhost`.

## Tips for Development

If you want to test cross-subdomain cookies during development:

- Use a custom domain like `.local.com` in your hosts file:

  ```
  127.0.0.1   app.local.com
  127.0.0.1   api.local.com
  ```

- Set cookie like:

  ```js
  res.cookie('sid', 'abc123', { domain: '.local.com' });
  ```

- This will allow both `app.local.com` and `api.local.com` to share cookies.

## TL;DR

- `domain` defines where the cookie will be sent.
- Without it, the cookie is scoped to the origin that set it.
- With it, the cookie is sent to that domain and its subdomains.
- For `localhost`, omit the `domain` — or use a custom domain for testing.

> ⚠️ Always test cookie behavior in real browsers — small mistakes in domain config can lead to unexpected behavior.

## 📂 Editing the `hosts` File (For Local Testing)

### 💻 Windows

1. Open Notepad as Administrator.
2. Open the file: `C:\Windows\System32\drivers\etc\hosts`
3. Add entries like:

   ```
   127.0.0.1 app.local.com
   127.0.0.1 api.local.com
   ```

4. Save the file.

### 🥜 macOS

1. Open Terminal.
2. Run:

   ```sh
   sudo nano /etc/hosts
   ```

3. Add entries:

   ```
   127.0.0.1 app.local.com
   127.0.0.1 api.local.com
   ```

4. Press `Ctrl+O` to save and `Ctrl+X` to exit.
5. Flush DNS cache with:

   ```sh
   sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
   ```

### 💾 Linux

1. Open Terminal.
2. Edit the hosts file:

   ```sh
   sudo nano /etc/hosts
   ```

3. Add entries:

   ```
   127.0.0.1 app.local.com
   127.0.0.1 api.local.com
   ```

4. Save and close (`Ctrl+O`, then `Ctrl+X`).
5. Restart your browser if necessary.

---

# Understanding Top-Level Navigations

A **top-level navigation** refers to any change that affects the **main address bar (URL)** of the browser — i.e., when the **topmost browsing context** (the main tab or window) is redirected or loaded to a new page.

It is considered a **user-initiated full-page navigation**.

## Examples of Top-Level Navigations

1. **Clicking a link:**

   ```html
   <a href="https://example.com/profile">Go to Profile</a>
   ```

   This navigates the entire page to `https://example.com/profile`.

2. **Submitting a form:**

   ```html
   <form action="https://example.com/submit" method="GET">
     <button type="submit">Submit</button>
   </form>
   ```

   If the form is not inside an iframe and no `target` attribute is used, it changes the main page URL.

3. **Programmatic navigation:**

   ```js
   window.location.href = 'https://example.com/dashboard';
   ```

   JavaScript navigation that causes the browser to load a new URL.

4. **Entering a URL manually:**
   The user types a new address into the browser's address bar and presses Enter.

## What Is Not Top-Level Navigation

1. **Iframe navigations:**

   ```html
   <iframe src="https://example.com/child"></iframe>
   ```

   The main page stays the same — only the iframe's content changes.

2. **AJAX / `fetch()` / `XMLHttpRequest`:**
   These make network requests but do **not change** the visible URL or load a new page.

3. **Image, script, or video loads:**

   ```html
   <img src="https://example.com/image.jpg" />
   ```

   Loading resources doesn’t affect the top-level page.

## Why It Matters for Security

Browser cookie policies (like `SameSite=Lax`) **allow cookies on top-level GET navigations**, even if they’re cross-site. But they block cookies for other types of cross-origin requests, helping defend against CSRF.

## ✅ TL;DR

- Top-level navigation changes the main browser URL or page.
- It can be triggered by link clicks, form submissions, or JavaScript.
- It’s **important** in how browsers decide whether or not to send cookies during a request.

---

# Creating an HTTPS Express Server Using OpenSSL

## Step 1: Generate SSL Certificate and Key with OpenSSL

Run the following command in your terminal:

```bash
openssl req -x509 -newkey rsa:2048 -nodes -keyout key.pem -out cert.pem -days 365
```

This creates:

- `key.pem`: Your private key
- `cert.pem`: Your self-signed SSL certificate

> Note: You'll be prompted for details like Country, State, etc. You can skip them by pressing Enter.

## Step 2: Update Your Express Code to Use HTTPS

Replace your HTTP server code with the following code:

```js
// index.js
import express from 'express';
import https from 'https';
import fs from 'fs';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Secure World 🔒');
});

const PORT = 4000;

const sslOptions = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
};

https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`🚀 HTTPS server running at https://localhost:${PORT}`);
});
```

## Step 3: Run Your Server

```bash
node index.js
```

## Step 4: Visit in Your Browser

Open your browser and navigate to:

```
https://localhost:4000
```

> ⚠️ You'll see a security warning because the certificate is self-signed. Click "Advanced" → "Proceed".

---

# Understanding the `SameSite` Cookie Attribute

## What is `SameSite`?

The `SameSite` attribute is a setting on cookies that tells browsers **when to include cookies in cross-site requests**. It was introduced to help protect web applications from **Cross-Site Request Forgery (CSRF)** attacks.

## Why It Matters

Browsers automatically used to attach cookies to requests — even those initiated by other websites (like form submissions or image loads). This behavior was exploited by attackers. `SameSite` gives developers control over **when cookies should or should not be sent**.

## History of `SameSite`

| Year            | Event                                                                                                                                                                 |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Before 2016** | ❌ The `SameSite` attribute did not exist. Browsers sent cookies with **all cross-site requests** by default — even malicious ones.                                   |
| **2016**        | ✅ Chrome 51 introduced support for the `SameSite` attribute (optional). Developers could set `SameSite=Strict` or `Lax` manually. It's **default value** was `None`. |
| **2020**        | 🔐 Chrome 80 (and later other browsers) changed the **default behavior**. Now, cookies **without** a `SameSite` attribute are treated as `SameSite=Lax`.              |

## `SameSite` Attribute Values

### 1. `SameSite=Strict`

- Cookie is **only sent** if the request is **same-site** (same origin).
- Completely blocks cookies in all cross-site requests — even `GET` link clicks.
- ✅ Maximum protection, but can break user flows like OAuth redirects or email confirmation links.

### 2. `SameSite=Lax`

- Cookies are sent:
  - On **same-site** requests ✅
  - On **top-level cross-site GET navigations** (like link clicks) ✅

- Cookies are **not sent** on cross-site `POST`, `PUT`, or `DELETE` ❌
- ✅ This is the **default behavior in modern browsers** (since 2020)

### 3. `SameSite=None`

- Cookies are sent on **all requests**, including cross-site `POST`, `PUT`, etc. ✅
- Requires:
  - `SameSite=None`
  - `Secure` flag (must be HTTPS)

- ❗ This is the only value that **does not protect** against CSRF

## 🔐 Security Implications

| Value    | CSRF Protection | Use Case                                                 |
| -------- | --------------- | -------------------------------------------------------- |
| `Strict` | ✅ Strongest    | Admin panels, banking apps                               |
| `Lax`    | ✅ Good enough  | Most web apps (default)                                  |
| `None`   | ❌ None         | Needed for cross-site iframes or federated login systems |

## ✅ TL;DR

- Before 2016: No `SameSite` — cookies were sent everywhere
- 2016: Chrome introduced `SameSite` as an **optional** defense
- 2020: Modern browsers made `SameSite=Lax` the **default**
- Always set `SameSite` explicitly for clarity and security:

```js
res.cookie('sessionId', 'abc123', {
  sameSite: 'lax', // or "strict", or "none"
  secure: true,
  httpOnly: true,
});
```

> 🍪 The `SameSite` attribute is now one of the simplest and most effective defenses against CSRF.

## Helpful Videos

### **Chrome for Developers**

- [SameSite Cookies - Chrome Update](https://www.youtube.com/watch?v=GPz7onXjP_4)

### **Hussein Nasser**

- [Will the New Chrome version 80 finally end Cross-Site Request forgery?](https://www.youtube.com/watch?v=ULKEr8Bdjlc)

- [SameSite Cookie Attribute Explained by Example](https://www.youtube.com/watch?v=aUF2QCEudPo)

- [A SameSite Cookie Exception was made to avoid Redirect Loop in Single Sign-On (SSO) Let us Discuss](https://www.youtube.com/watch?v=4QiD8cvzCN0)

### **LiveOverflow**

- [The Same Origin Policy - Hacker History](https://www.youtube.com/watch?v=bSJm8-zJTzQ)

---

# sameSite Attribute with Fetch()

    Strict → never sent cross-site.
    Lax → not sent cross-site (except 2-min POST grace period in Chrome).
    None; Secure → always sent cross-site.

---

# CSRF Attack (Cross-Site Request Forgery)

## What it is?

    -> CSRF is when a hacker tricks your browser into sending a request you didn’t intend.
    -> Since your browser has your cookies, the malicious request looks legit to the server.

## How it works (Step by Step)

    -> You log in to your bank (or any site) → Browser stores a session cookie.
    -> You visit a malicious site (attacker’s blog, ad, or email link).
    -> That site secretly makes a request to your bank like:
        <img src="https://mybank.com/transfer?to=attacker&amount=1000" />
    -> Browser automatically attaches your bank’s cookies.
    -> Bank receives the request → sees valid cookie → assumes it’s you → money transferred.

## Why it works?

    -> Browsers auto-attach cookies to requests (same-site and cross-site).
    -> The bank doesn’t know if the request came from you or a hacker’s site.

## Real-World Examples

    -> Money transfer without permission 💰
    -> Changing your email/password on a site 🔑
    -> Submitting a malicious form on your behalf

## How to Prevent CSRF

    -> SameSite Cookies → restrict cookie sending in cross-site requests.
    -> CSRF Tokens → server generates a random token per session/request; form submissions must include it.
    -> Double Submit Cookie → send CSRF token in both cookie + request body and compare.
    -> Check Referer/Origin Header → validate the request came from the right site.
    -> Use Secure + HttpOnly Cookies.

---

# Preventing CSRF Attack with CSRF Token

## Note:

```
In case we have to set the `sameSite:'none'` for cookies then only we need CSRF Token
```

```
In case if our frontend and backend are same, then we'll generate a csrfToken and embed it in one of the hidden input field and on all the requests we'll validate it.
```

## Note:

```
How to send and receive CSRF tokens when frontend and backend are separate?

In that case we'll create a separate endpoint /csrf-token which will return the CSRF token to the frontend, and we'll call this endpoint just before making the form submit request and take the CSRF token and put it inside the form payload and verify on the server.
```

---

# Preventing CSRF Attack using Custom Headers

We created a custom header named `x-csrf-token` (it could be anything) with some value say 12345, and include it in every sensitive request.

```ts
await fetch('/pay', {
  method: 'POST',
  credentials: 'include',
  headers: {
    'x-csrf-token': '12345',
  },
});
```

- On the server, we validate its presence:

```ts
if (!req.headers['x-csrf-token']) {
  return res.send('CSRF Token Missing');
}
```

If the request doesn't include this custom header then the request is rejected.

## How does this header prevent CSRF Attack

- Browsers automatically include cookies in cross-site requests, which is what makes CSRF attacks possible.

* However, custom headers (like x-csrf-token) cannot be added to cross-origin requests by default. EX: via a form.

* When such headers are used, the browser sends a preflight (OPTIONS) request for custom headers or methods like PUT , PATCH , DELETE as part of the CORS mechanism, to check whether the server allows it or not.

* If the server does not explicitly allow the attacker’s origin, the browser blocks the request.
* As a result, the actual request with the custom header is never sent.

## What If an Attacker Tries to Send the Same Header?

An attacker cannot successfully send the same custom header because:

- Browsers enforce CORS restrictions
- Cross-origin requests with custom headers require server permission
- If the server only allows trusted origins, the attacker’s request fails during the preflight phase

---

# DoS Attack

## What is a DoS Attack?

    -> Denial of Service (DoS) = An attack where the goal is to make a website, server, or network unavailable to its users.
    -> Instead of stealing data, attackers overwhelm the system so that real users can’t access it.

## How it Works

    -> Flooding with Requests
        The attacker sends too many fake requests at once (like refreshing a site millions of times).
        The server gets overloaded and can’t handle real users.

    -> Resource Exhaustion
        Attackers may exploit weak spots (CPU, memory, bandwidth).
        Example: Making a database do heavy queries repeatedly until it crashes.

    -> Exploiting Vulnerabilities
        Sometimes attackers use bugs in software to crash the service instead of flooding it.

## Types of DoS Attacks

    Volumetric Attacks → Overwhelm bandwidth (like flooding a pipe with water).
    Protocol Attacks → Exploit weaknesses in network protocols (e.g., SYN flood).
    Application-Layer Attacks → Target the app itself (e.g., sending repeated search requests that are expensive to process).

## Real-World Example

    -> Imagine a shop with only 1 cashier.
    -> An attacker hires 1,000 fake customers to stand in line.
    -> Real customers can’t buy anything → service is denied.

## Defense Against DoS

    -> Rate limiting (limit how many requests per second each user can make).
    -> Firewalls & Intrusion Detection (block suspicious traffic).

---
# Rate Limiting

## What is Rate Limiting?
    -> Rate Limiting = Restricting how many times a user/client can call an API within a specific time frame.
    -> Example: "A user can only call the /login API 5 times per minute."
    -> It prevents abuse, DoS, brute-force attacks, and unnecessary server load.

## Why APIs Need Rate Limiting
    -> Prevents brute force attacks (e.g., guessing passwords).
    -> Protects against DoS/DDoS attacks (too many requests).
    -> Ensures fair usage among users.
    -> Saves server resources & bandwidth.

## Common Strategies for Rate Limiting

    Fixed Window
        -> Example: Allow 100 requests per minute.
        -> Simple but can cause bursts at window reset.
        -> Eg. "You can withdraw ₹10,000 per day from ATM."

    Sliding Window / Rolling Window
        -> Looks at last X seconds/minutes dynamically.
        -> More accurate and smooth.
        -> Eg. "In the last 24 hours, you can only withdraw ₹10,000." 

    Token Bucket
        -> Each request consumes a “token.”
        -> Tokens refill at a set rate (like filling a bucket with drops).
        -> Flexible — allows short bursts but controls long-term usage.
        -> Eg. "Your internet plan allows bursts of high speed (using tokens), but overall speed is limited."

    Leaky Bucket
        -> Requests are processed at a fixed rate, excess gets dropped.
        -> Smooths out request spikes.
        -> Eg. "Queue at a toll booth, cars leave at a fixed rate; if too many arrive, they wait or get blocked."

## Example in Real Life
    -> ATM: You can’t withdraw money more than a limit per day.
    -> API: You can’t call /checkout more than 10 times per minute.