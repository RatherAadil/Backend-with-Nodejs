## IPv6 Address

### IPv6 Address – Quick Summary

        IPv6 is a 128-bit IP address format (vs. 32-bit in IPv4).
        It consists of 8 groups, each with 4 hexadecimal characters, separated by colons (:).
        Example:
        2001:0db8:0000:0000:0000:ff00:0042:8329

### IPv6 Format Rules

        Leading Zeros Can Be Removed:
            0db8 → db8

        Consecutive All-Zero Groups Can Be Replaced with :: (once only):
            2001:0db8:0000:0000:0000:ff00:0042:8329
            becomes
            2001:db8::ff00:42:8329

        All Zeros? Use :: Alone:
            0000:0000:0000:0000:0000:0000:0000:0000 → ::

### Types of IPv6 Addresses

        GUA (Global Unicast Address):
            Routable on the internet.
            Starts typically with 2 or 3.
            Blocked by firewall by default for security.

        Temporary IPv6 Address:
            Randomized for privacy; changes over time.

        Link-Local Address:
            Used for local communication (same LAN).
            Always starts with fe80::/10.

### 🌐 Using IPv6 in Browsers

        To access an IPv6 address directly in a browser, enclose it in square brackets:
        http://[2001:db8::1]/

### ⚠️ IPv6 and IPv4 Compatibility

        If you disable IPv4, only websites that support IPv6 will be accessible.
        Many websites still rely on IPv4, so full IPv6-only setups can limit access.

#### Server Example

```javascript
import http from 'http';
const server = http.createServer((req, res) => {
  res.end('Hello, World!');
});
server.listen(4000, '::', () => {
  console.log('Server is listening on port 4000 (IPv6)');
});
```

Same Device: [koi bhi IPv6]:4000 se content mil gaya.
