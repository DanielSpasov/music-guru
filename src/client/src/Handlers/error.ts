import { ZodError } from 'zod';

export function errorHandler(error: any) {
  try {
    if (error instanceof ZodError) handleZodError(error);
  } catch (error) {
    console.error('Unhandled Error');
  }
}

function handleZodError(error: ZodError) {
  try {
    const issues = JSON.parse(error.toString());
    console.error(issues?.[0]?.message);
  } catch {
    console.error('Unhandled Zod Error');
  }
}
