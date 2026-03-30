import * as z from 'zod';

export const validateInput = (schema, inputData) => {
  const result = schema.safeParse(inputData);
  if (!result.success) {
    return {
      data: null,
      error: result.error.flatten().fieldErrors,
    };
  }

  return {
    data: result.data,
    error: null,
  };
};
