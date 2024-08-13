import resendValidationEmail from './ResendValidationEmail';
import validateEmail from './ValidateEmail';
import validateToken from './ValidateToken';
import changeUsername from './ChangeUsername';
import changePassword from './ChangePassword';
import signUp from './SignUp';
import signIn from './SignIn';

export const auth = {
  resendValidationEmail,
  validateEmail,
  validateToken,
  changeUsername,
  changePassword,
  signUp,
  signIn
};
