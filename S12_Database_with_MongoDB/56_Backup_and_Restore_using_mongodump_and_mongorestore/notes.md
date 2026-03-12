# To use mongodump and mongorestore we have to install mongodb tools

1. Install mongodb tools
2. Set Env variable for the C:\Program Files\MongoDB\Tools\100\bin
3. use mongodump to get backup in the user folder dump of dbs C:\Users\ADIL\dump

#### Note: All the commands are present in another .md file

## mongodump (Backup)

    -> Creates a backup of MongoDB data in BSON format.
    -> Can dump entire DB, specific DB, or collections.
    -> Supports options like compression (--gzip), authentication, and dumping to archive files.

Example:

```javascript
mongodump --db mydatabase --out /backup/mongo/
```

## mongorestore (Restore)

    -> Restores data from BSON backups created by mongodump.
    -> Can restore entire dump, specific DB, or collections.
    -> Supports options like dropping existing data before restore (--drop), authentication, and reading from archives or compressed files.

Example:

```javascript
mongorestore --db mydatabase /backup/mongo/mydatabase/
```
