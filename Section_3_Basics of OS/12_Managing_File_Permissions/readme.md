# Permissions

- Read (r) or 4
- Write (w) or 2
- Execute (x) or 1ch

### To check file permissions

```
ls -l
```

## Representations

```
- for file
d for directory
l for symbolic link

```

## Add and Remove perm.

```
- for remove
+ for add
```

### Ex:

```
chmod -x file.txt
```

# GIT FILE PERMMISSIONS

- 100644: Normal file with non-executable perm.
- 100755: Normal file with executable perm.
- 120000: Symbolic link
- 040000: Directory

```
git diff --summary
```
