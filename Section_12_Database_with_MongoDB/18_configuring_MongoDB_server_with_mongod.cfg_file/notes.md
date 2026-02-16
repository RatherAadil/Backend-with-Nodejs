MongoDB Config File

    -> It’s a text file where you tell MongoDB how to run.

    -> You can set things like:
        -> Where to save your data (dbPath).
        -> Where to save logs.
        -> What network address and port to use.

    Example to set data folder:
        storage:
        dbPath: C:\my_mongo_data

    -> To start MongoDB using this file, run:
        mongod --config path\to\mongod.config

mongod.cfg

Where to locate it

go to: services (run services.msc inside win+R dialogue box)

find the mongodb server right click and look for the mongod command which has --config flag

copy the folder path and open it in your fileexplorer, explore the .cfg file

explore around log files under log section

try changing the dbpath to the earlier dbpath C:/data/db

or do the vice-versa => try copying the .cfg path and run it from terminal using the --config flag after mongod
the logs will be present in one folder upwards from the bin folder of mongodb (as mentioned in server file inside services.msc)

thats all!
