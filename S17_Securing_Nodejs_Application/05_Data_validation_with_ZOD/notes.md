# Zod

Zod is a JavaScript/TypeScript library used to check and validate data (like form inputs or API requests).

Why Use Zod?

```
-> Makes sure data is in the correct format
-> Works great with TypeScript
-> Easy to use and fast
-> Catches invalid or missing data early
```

Example:

```js
const userSchema = z.object({
  name: z.string(),
  age: z.number(),
});
```

- Then you can validate data like this:

```js
userSchema.parse({ name: 'Aadil', age: 22 }); // ✅ Valid
userSchema.parse({ name: 'Aadil', age: 'twenty' }); // ❌ Error
```

## safeParse in Zod:

- safeParse is a method in Zod that lets you validate data safely without crashing your app.
- How it Works:

```
  Returns an object with { success: true, data } if valid
  Returns { success: false, error } if invalid
```

- Example:

```js
const result = userSchema.safeParse({ name: 'Aadil', age: 'twenty' });

if (result.success) {
  console.log('✅ Valid:', result.data);
} else {
  console.log('❌ Error:', result.error.issues);
}
```

## Another example:

```js
const userSchema = z.object({
  name: z
    .string()
    .min(3, 'Please enter at least 3 characters')
    .max(50, 'Please enter at max 50 characters.'),
  email: z.email().optional(),
  otp: z
    .string()
    .min(4)
    .max(4)
    .regex(/^\d{4}$/, 'Please enter a valid 4 digit number'),
});

const user = { name: 'aadil', email: '@gmail.com', otp: '1234' };
const sanitizeData = userSchema.safeParse(user);
if (sanitizeData.success) {
  console.log(sanitizeData.data);
} else {
  console.log(sanitizeData.error.issues);
}
```
