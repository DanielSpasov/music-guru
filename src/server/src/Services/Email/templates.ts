import { Template, TemplateData } from './helpers';

const templates: Record<Template, (data: any) => TemplateData> = {
  VERIFY: (data: { token: string }) => {
    const link = `http://localhost:3000/verify-email?token=${data?.token}`;
    return {
      subject: 'Email Verification',
      text: `Follow this link to verify your email: ${link}`
    };
  },
  CODE: () => ({
    subject: '2FA Code',
    text: `2FA Code: ${Math.random().toString().substring(2, 8)}`
  })
};

export default templates;
