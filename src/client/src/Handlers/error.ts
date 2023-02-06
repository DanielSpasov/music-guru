import { ZodError } from 'zod';

export function errorHandler(error: any) {
  try {
    if (error instanceof ZodError) {
      return handleZodError(error);
    }
  } catch (error) {
    console.error('Unhandled Error');
  }
}

function handleZodError(error: ZodError) {
  try {
    return JSON.parse(error.toString());
  } catch {
    console.error('Unhandled Zod Error');
  }
}
