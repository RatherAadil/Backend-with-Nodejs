import * as z from 'zod';
const Schema = z
  .string()
  .max(4, 'Please enter max of 4 digit number.')
  .regex(/^\d{4}$/, 'Please enter a valid 4 digit number.');
const rawData = '10';
const result = Schema.safeParse(rawData);

// if (result.success) {
//   console.log(result.data);
// } else {
//   console.log(result.error.issues);
// }

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

