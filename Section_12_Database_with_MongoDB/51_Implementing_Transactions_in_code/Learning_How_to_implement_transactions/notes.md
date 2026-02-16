# What is a Session?

A session in MongoDB is a logical context that groups multiple operations together.
It allows MongoDB to track and manage operations as part of transactions or causal consistency.
Think of a session as a workspace where you can perform one or more transactions safely.
Why Sessions Are Used

1. To start transactions (for atomic multi-document or multi-collection operations).

2. To maintain causal consistency (operations happen in a guaranteed order).

3. To logically group related operations together under one context.

## Steps to enable transaction in MongoDB

    1. Edit the Config File (mongod.conf)

        -> Add the following under the replication section:
            replication:
                replSetName: myReplcia

    2. Restart the MongoDB service if installed as a service on Windows

    3. Initiate the Replica Set
        -> In the shell, run: rs.initiate()

    4. Verify Status: rs.status()

    5. Change the connection String: mongodb://localhost:27017/?replicaSet=myReplcia
