export const validateUsername = (target: HTMLInputElement): void => {
  if (target.value.length < 6 && target.value.length !== 0) {
    target.setCustomValidity('Username must be at least 6 symbols.');
  } else if (target.value.length > 16) {
    target.setCustomValidity('Username can be at most 16 symbols.');
  } else {
    target.setCustomValidity('');
  }
};
