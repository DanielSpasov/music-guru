import { Template, TemplateData } from './helpers';

const templates: Record<Template, (data: any) => TemplateData> = {
  VERIFY: ({ expToken, username }) => {
    const link = `${process.env.WEBAPP_URL}/verify-email?token=${expToken}`;
    return {
      subject: 'Verify Your Email Address',
      text: `Hi ${username},
      
Thank you for signing up with Music Guru!

Please verify your email address to complete your registration. Simply click the link below to confirm your email:

${link}

If you did not sign up for an account with us, please ignore this email.

Thank you,
The Music Guru Team`
    };
  },
  PASSWORD_CHANGED: ({ username }) => ({
    subject: 'Your Password Was Changed',
    text: `Hi ${username},
      
Just a quick note to let you know that your password was successfully changed.

If you didn't do this or think something's not right, please get in touch with us ASAP at [Support Email/Phone Number].

For extra security, here are a few tips:

• Use a strong, unique password you haven't used before.
• Avoid using easily guessable info.
• Turn on two-factor authentication (2FA) if you haven't already.

Thank you,
The Music Guru Team`
  }),
  CODE: () => ({
    subject: '2FA Code',
    text: `2FA Code: ${Math.random().toString().substring(2, 8)}`
  })
};

export default templates;
