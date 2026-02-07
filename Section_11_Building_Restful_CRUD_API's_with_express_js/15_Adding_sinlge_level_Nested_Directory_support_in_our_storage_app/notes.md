## summary of the video

- Implemented nested directory structure for file storage
- Implemented the functionality for chcek directory or file while reading the storage folder using stat method
- move to the storage directory and create nested directories and files to test the functionality
- important point is create dynamic optional params in express route to handle both root and nested directory reading

* syntex express v4+ : `/directory/:dirname?` -> '?' makes the param optional
* syntex express v5+ : `'/articles{/:year}{/:month}{/:day}'` -> '{}' makes the param optional
