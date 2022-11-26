export const username = (value: any) => {
  if (typeof value !== 'string') {
    return 'Invalid Value';
  }
  if (value && value.length < 2) {
    return 'Username must be at least 2 symbols';
  }
  if (value && value.length > 16) {
    return 'Username must be at most 16 symbols';
  }
};
