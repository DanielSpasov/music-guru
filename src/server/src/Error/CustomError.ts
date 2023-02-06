export class CustomError extends Error {
  message: string;
  code: number;

  constructor({ message, code }: { message: string; code: number }) {
    super(message);
    this.name = 'Custom Error';
    this.message = message;
    this.code = code;
  }
}
