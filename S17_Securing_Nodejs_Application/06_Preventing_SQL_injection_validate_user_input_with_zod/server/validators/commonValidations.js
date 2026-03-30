import * as z from 'zod';

export const emailSchema = z.email('Please enter a valid email address.');

export const passwordSchema = z
  .string('Please enter a valid password')
  .min(4, 'Password must be atleast 4 characters long.');

export const enabledSchema = z.object({
  enabled: z.boolean({
    required_error: 'Enabled is required',
    invalid_type_error: 'Enabled must be a boolean value',
  }),
});

export const permissionSchema = z.object({
  permission: z.enum(['viewer', 'editor'], 'Enter a valid permission'),
});

export const enabledAndPermissionSchema = z.object({
  ...enabledSchema.shape,
  permission: permissionSchema,
});

export const roleSchema = z.object({
  newRole: z.enum(['User', 'Manager', 'Admin', 'Owner'], {
    required_error: 'role is required',
    invalid_type_error: 'Invalid role',
  }),
});

export const uuidSchema = z.object({
  token: z.uuid({
    message: 'Invalid token',
  }),
});

export const renameSharedFileSchema = z.object({
  ...uuidSchema.shape,
  newFileName: z
    .string('New file name is required')
    .min(1, 'File name cannot be empty.')
    .max(150, 'File name cannot be more than 150 characters'),
});
