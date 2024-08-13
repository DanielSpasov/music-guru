import resendValidationEmail from './resendValidationEmail';
import validateEmail from './validateEmail';
import validateToken from './validateToken';
import changeUsername from './changeUsername';
import changePassword from './changePassword';
import signUp from './signUp';
import signIn from './signIn';

export const auth = {
  resendValidationEmail,
  validateEmail,
  validateToken,
  changeUsername,
  changePassword,
  signUp,
  signIn
};
