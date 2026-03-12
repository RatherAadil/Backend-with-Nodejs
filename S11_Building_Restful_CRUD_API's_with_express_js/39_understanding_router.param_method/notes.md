## router.param() method

`router.param()` is Express middleware that runs whenever a specific `dynamic route `parameter `(:param)` is present.

- Triggered only for dynamic routes

- Runs before the route handler

- Receives (req, res, next, value)

- Used for validation, preloading data, or normalizing params

- Executes once per request per param

Example:

```javascript
router.param('id', (req, res, next, id) => {
  // validate or load data
  next();
});
```

- It can be used with `app` as well, like:

```javascript
app.param();
```
