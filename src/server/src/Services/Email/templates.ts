import { Template, TemplateData } from './helpers';

const templates: Record<Template, (data: any) => TemplateData> = {
  VERIFY: ({ expToken, username }) => {
    const link = `http://localhost:3000/verify-email?token=${expToken}`;
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
  CODE: () => ({
    subject: '2FA Code',
    text: `2FA Code: ${Math.random().toString().substring(2, 8)}`
  })
};

export default templates;
