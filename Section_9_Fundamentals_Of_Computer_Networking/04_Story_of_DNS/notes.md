## History of DNS (Domain Name System)

Before you could type a simple URL like google.com, the internet had a much more manual system for finding computers.

`Before DNS – hosts.txt Era (1970s–1983)`

- In the early ARPANET, domain names were managed using a single file: hosts.txt.
- It mapped hostnames to IP addresses manually.
- Managed by Elizabeth Feinler and her team at SRI (Stanford Research Institute).
- They even helped define the first top-level domains (TLDs):
  .com, .edu, .gov, etc.

### Problems:

- As the network grew, the hosts.txt file became huge and difficult to manage.
- Frequent updates had to be distributed manually to all machines.

## Invention of DNS – 1983

- Paul Mockapetris developed the Domain Name System (DNS) to solve the scaling problem.
- DNS introduced:
  - ✅ Distributed system (no central file)
  - ✅ Hierarchical structure (root → TLD → domain)
  - ✅ Scalability for millions of domains
  - 🧪 It allowed automatic name-to-IP resolution via DNS servers.

### Integration into Applications

DNS quickly became integral to tools like:

- Telnet
- FTP
- Email

`🔁 Before DNS:`

```
telnet 193.34.23.2
```

`After DNS:`

```
telnet example.com
```

Much more user-friendly and readable.

### DNS Today

- Powers millions of domains globally.
- Supports security enhancements like DNSSEC.

`Essential for:`

- Websites
- Email delivery
- Mobile & web apps
- IoT devices
- Cloud-based services

### 🔍 Summary

DNS replaced a manual, centralized system (hosts.txt) with a dynamic, automated, and scalable infrastructure — making the modern internet usable for everyone. 🌍💡
