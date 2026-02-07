## How DNS Server works ?

### DNS Lookup Flow

    You can test DNS resolution using the command:
    nslookup <domainName>

    📶 Preference for IPv6
        If both IPv4 and IPv6 DNS servers are available, your laptop will prefer IPv6 (for better performance and more available addresses).

    🔐 Direct IP Access Control
        Accessing a site via direct IP (like http://142.250.182.14) depends on the website owner—they can allow or block this.

    🌐 Common DNS Servers
        1.1.1.1 → Cloudflare DNS
        8.8.8.8 → Google DNS

### DNS Resolution Steps

        1. Check Browser Cache
            Browser checks if it has the IP for the domain stored.
        2. Check OS Cache
            If not found in the browser, the system checks the Operating System's DNS cache.
        3. Ask DNS Resolver (e.g., 1.1.1.1 or 8.8.8.8)
            The recursive DNS server checks its own cache.
        4. Query Root Server
            If the cache misses, it contacts the Root DNS Server (.).
            The Root Server responds with the IP address of the Top-Level Domain (TLD) Server (e.g., .com).
        5. Query Top-Level Domain Server
            Your DNS server asks the TLD Server for the IP of the Authoritative Name Server for the requested domain (e.g., google.com).
        6. Query Authoritative Name Server
            This server knows the actual IP of the domain.
            It responds with the correct IP address.
        7. Browser Connects to Web Server
            The browser now connects to the web server using the IP and loads the website.

### What is a Name Server?

        A Name Server is a specialized server on the internet that handles queries about the location of domain names.
        It's part of the DNS system and stores DNS records (A, AAAA, MX, etc.) for a domain.
        Authoritative Name Servers are the final source of truth for a domain’s IP address.

### What is TTL (Time To Live)?

        TTL is a value (in seconds) that tells how long a DNS record can be cached.
        For example, if TTL = 300, the record can be cached for 5 minutes.
        A shorter TTL means more frequent updates but more DNS traffic. A longer TTL improves performance but may delay changes.
