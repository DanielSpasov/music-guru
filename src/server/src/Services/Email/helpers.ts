export const templates = ['VERIFY', 'CODE'] as const;

export type Template = (typeof templates)[number];
export type TemplateData = {
  subject: string;
  text?: string;
};
