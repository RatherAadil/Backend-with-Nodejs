import * as z from 'zod';

export const directoryNameSchema = z.object({
  newDirName: z
    .string({
      required_error: 'Please enter a directory name',
      invalid_type_error: 'Directory name must be a string',
    })
    .min(1, 'Directory name cannot be empty')
    .max(150, 'Directory name cannot be more than 150 characters.'),
});
