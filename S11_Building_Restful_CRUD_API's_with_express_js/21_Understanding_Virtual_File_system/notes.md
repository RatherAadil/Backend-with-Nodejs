- Currently we are storing all the file, folders inside the storage directory.
- And we are serving all the folders, files, directly to the user. This is not a good approach. we just need to share the information with the user not the entire files.

* This approach is time consuming when we have large sized directories with nested directories.

- For that we can create a json file to store the information about the files and folder seperatly.

- For files its structure would be like:

```json
[
  {
    "id": 10,
    "name": "test.png",
    "parentDir": 321,
    "size": 4353
  },
  {
    "id": 11,
    "name": "test.png",
    "parentDir": 321,
    "size": 4353
  }
]
```

- For Folders :

```json
[
  {
    "id": 1,
    "name": "test",
    "parentDir": null,
    "content": {
      "files": [10],
      "directories": [2, 3]
    }
  },
  {
    "id": 2,
    "name": "images",
    "parentDir": 1,
    "content": {
      "files": [11],
      "directories": []
    }
  }
]
```
