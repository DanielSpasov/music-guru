import { Template, TemplateData } from './helpers';

const templates: Record<Template, TemplateData> = {
  VERIFY: {
    subject: 'Email Verification',
    text: `Follow this link to verify your email: 'link'`
  },
  CODE: {
    subject: '2FA Code',
    text: `2FA Code: ${Math.random().toString().substring(2, 8)}`
  }
};

export default templates;
