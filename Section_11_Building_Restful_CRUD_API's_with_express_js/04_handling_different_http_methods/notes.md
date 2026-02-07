## Handling Different HTTP Methods in Express

In Express, each HTTP method has a corresponding function:

    app.get(path, handler);     // Read data
    app.post(path, handler);    // Create data
    app.put(path, handler);     // Replace data
    app.patch(path, handler);   // Update partial data
    app.delete(path, handler);  // Delete data
    app.all(path, handler);     // Handle all methods
