# Steps to setup authentication on db without Replica Set

1. open mongosh use admin db set user admin with role root

```js
db.createUser({
  user: 'admin',
  pwd: 'admin',
  roles: [{ role: 'root', db: 'admin' }],
});
```

2.  Switch to db where provide option to a dbAdmin user provide the dbAdmin and readWrite access

        Ex- newDriveApp

```js
db.createUser({
  user: 'dbAdmin',
  pwd: 'dbAdmin123',
  roles: [
    { role: 'dbAdmin', db: 'newDriveApp' },
    { role: 'readWrite', db: 'newDriveApp' },
  ],
});
```

#### Here, we have create 2 users admin and dbAdmin of newDriveApp

1. admin wil have full access of MongoDB server and dbAdmin have only full access of newDriveApp for now

2. Open C:\Program Files\MongoDB\Server\8.2\bin
3. Open the mongod.cfg file run as administrator change security open do refresh by stopping and restart thhe mongoDB service

```bash
Security:
authorization: enabled
```

4. Change MongoDB connection URL string in the clients (MongoDB Compass, Backend Codebase, MongoDB playground, MongoSH) of DB.

##### Connection strings:

admin :

```bash
mongodb://admin:admin@localhost:27017/
```

dbAdmin:

```bash
mongodb://dbAdmin:dbAdmin123@localhost:27017/newDriveApp
```
