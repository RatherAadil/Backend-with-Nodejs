# RBAC (Role-Based Access Control)

RBAC is a way to control what users can do in an application by assigning them roles (like Admin, Manager, User). Each role has specific permissions (like read, write, delete), and users get access based on their role.

## Key Points:

    -> Users are assigned Roles
    -> Roles have predefined Permissions
    -> It’s easier to manage than giving individual permissions
    -> Improves security, scalability, and auditability

## Example:

    -> User → can read/write their own files
    -> Manager → can read all files
    -> Admin → full access to everything

RBAC is commonly used in apps because it’s simple, secure, and easy to manage.

---

# Google Zanzibar

    -> Internal system by Google for fine-grained access control.
    -> Manages permissions for products like Google Drive, YouTube, etc.
    -> Uses a relationship-based model (e.g., user X is a viewer of doc Y).
    -> Extremely scalable, low-latency, and globally consistent.
    -> Access defined through tuples (e.g., document:doc1#viewer@user:john).
    -> Not open source; detailed in a research paper.

# OpenFGA

    -> Open-source authorization system inspired by Zanzibar.
    -> Created by Auth0, now community-driven.
    -> Lets developers define custom access models using schemas and tuples.
    -> Supports complex permissions: users, roles, groups, shared resources.
    -> API-first and language-agnostic (can be used with any backend).
    -> Good for building secure, scalable access control in your apps.
