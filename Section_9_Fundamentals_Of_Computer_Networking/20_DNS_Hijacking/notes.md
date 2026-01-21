# 📌 DNS Hijacking

### Definition

**DNS Hijacking** is a cyber attack or configuration manipulation where the DNS (Domain Name System) data is changed to redirect users to an incorrect IP address—whether that be a malicious site or a custom local server.

---

### 🔹 How It Works

- **Normal Case:** You type a domain in your browser → DNS server returns the correct IP address → The legitimate website opens.
- **Hijacked Case:** DNS records are manipulated → A wrong IP address is returned → The user is sent to a different site or server.

---

### 🔹 Types of DNS Hijacking

#### 1. Router Level Hijacking

Attackers change the DNS settings on a router to redirect all connected users to a fake DNS server.

#### 2. Local DNS Hijacking

An entry is added to the victim's local host file (`C:\Windows\System32\drivers\etc\hosts` on Windows) to redirect a specific domain to a custom IP.

**Example Case:**
Editing the host file:

Adding the redirect:
`192.168.1.9     www.cool.com`

Running a local server on port 80:

```javascript
import http from 'http';
const server = http.createServer((req, res) => {
  res.end('Hello, World!');
});
server.listen(80, '0.0.0.0');
```

Now, when you open `www.cool.com` in your browser, it will show your local server's content, regardless of where that domain actually points on the internet.

#### 3. Man-in-the-Middle (MITM) DNS Attack

An attacker intercepts network traffic and modifies the DNS responses in real-time.

#### 4. ISP Level Hijacking

An Internet Service Provider performs intentional or accidental DNS redirection (often for advertising or tracking purposes).

---

### 🔹 Common Goals of Attackers

- **Phishing 🎯:** Stealing credentials via fake login pages.
- **Malware Spread 🦠:** Forcing users to download malicious software from fake sites.
- **Ad Revenue Fraud 💰:** Redirecting users to pages filled with ads.
- **Local Development / Testing 🛠:** A legitimate use case where developers map custom domains to local servers on their own systems.

---

### 🔹 Symptoms (Malicious Case)

- Websites loading incorrectly or showing different content.
- Unwanted pop-ups or ads appearing in the browser.
- **HTTPS warnings** or certificate mismatch errors.

---

### 🔹 Protection Measures

- ✅ **Change Default Router Passwords**
- ✅ **Use Secure DNS** (Google DNS: 8.8.8.8, Cloudflare: 1.1.1.1)
- ✅ **Enable DNSSEC**
- ✅ **Keep OS & Router Firmware Updated**
- ✅ **Check hosts Files Regularly** (`/etc/hosts`)
- ✅ **Use Antivirus & Anti-malware Tools**

---

> [!IMPORTANT]
> **Key Point:** If the `/etc/hosts` file is changed, the role of the DNS server is bypassed. Your system resolves the domain name directly to the manually set IP. While this is useful for legitimate testing, malicious actors can use it for phishing or data theft.
