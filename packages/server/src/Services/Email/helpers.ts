export const templates = ['VERIFY', 'CODE', 'PASSWORD_CHANGED'] as const;

export type Template = (typeof templates)[number];
export type TemplateData = {
  subject: string;
  text?: string;
};
