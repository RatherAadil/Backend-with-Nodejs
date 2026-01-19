### Different modes of opening files

- By default file is opened in read mode

```javascript
const fd = fs.openSync(path, mode);
```

#### Modes:

- `r` - read
- `w` - write
- `a` - append
- `mode+` - mode operation and read/write
