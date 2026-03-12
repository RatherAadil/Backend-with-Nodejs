## 📁 Organizing Routes Using Express Router

### (Making `app.js` cleaner & modular)

### 🔥 Why Use Express Router?

As a project grows, keeping all routes in `app.js` makes the file bulky, confusing, and unreadable.
To solve this, we:

- ✔ Split routes into different files.
- ✔ Use `express.Router()`.
- ✔ Define only specific categories of routes in each file.
- ✔ Keep `app.js` clean and readable.

---

### 🧱 Steps Followed

#### ✅ 1. Created Route Files

- `fileRoutes.js`
- `directoryRoutes.js`
  Each file handles its own specific functionality.

#### ✅ 2. Used `express.Router()`

Inside each route file:

```javascript
const router = express.Router();
```

#### ✅ 3. Replaced `app.get()` → `router.get()`

Previously, we used `app.get()` or `app.post()` directly. Now, inside each route file, we use:
`router.get("/*", ...)`
`router.post("/*", ...)`
`router.patch("/*", ...)`
`router.delete("/*", ...)`
This approach makes the code modular.

#### ✅ 4. Exported the Router

At the end of every route file:

```javascript
export default router;
```

This allows us to import the router into `app.js`.

#### ✅ 5. Imported and Used Routes in `app.js`

`app.js` is now much cleaner 👍:

```javascript
import directoryRoutes from './routes/directoryRoutes.js';
import fileRoutes from './routes/fileRoutes.js';

app.use('/directory', directoryRoutes);
app.use('/files', fileRoutes);
```

**How it works:**

- Requests starting with `/directory/...` → routed to `directoryRoutes`
- Requests starting with `/files/...` → routed to `fileRoutes`
