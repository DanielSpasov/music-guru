import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { ZodError } from 'zod';

export function errorHandler(error: any) {
  try {
    if (error instanceof AxiosError) {
      return handleAxiosError(error);
    }
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

function handleAxiosError(error: AxiosError) {
  try {
    const resData = error.response?.data as any;
    if (resData.message) {
      toast.error(resData.message);
      return;
    }
  } catch {
    console.error('Unhandled Axios Error');
  }
}
