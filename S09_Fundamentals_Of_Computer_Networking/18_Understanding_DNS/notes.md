# Understanding Domain Name System (DNS)

The Domain Name System (DNS) translates human-readable domain names (like **[www.google.com](https://www.google.com)**) into IP addresses that computers use to identify each other on the network.

---

## Domain Hierarchy

### Root Level (RLD)

- Represented by a dot (**.**)
- It is the highest level in the DNS hierarchy
- Managed by **ICANN** (Internet Corporation for Assigned Names and Numbers)
- Contains all Top-Level Domains (TLDs)

### Top-Level Domain (TLD)

- **Examples:** .com, .org, .net, .gov, .in
- TLDs are owned by organizations that have the authority to manage them
- These organizations are allowed to create Second-Level Domains

### Second-Level Domain

- **Example:** google in **google.com**
- Created under a TLD
- Ownership of second-level domains is granted by TLD registrars

### Subdomain

- **Example:** www in **[www.google.com](https://www.google.com)**
- Created under a second-level domain
- Can be multiple levels deep (e.g., **mail.support.google.com**)

---

## Important Rules

- The total length of a domain name (including dots) **cannot exceed 255 characters**.
- Each label (a part of the domain between dots) can be **up to 63 characters long**.

---

## Domain Registration

While TLDs are owned by authorized organizations, they typically do not sell domains directly. Instead, **domain registrars** (also known as brokers), such as GoDaddy, Namecheap, etc., handle the sale and management of second-level domains to the public.
