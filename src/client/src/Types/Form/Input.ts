export type InputProps = {
  type: InputType;
  required?: boolean;
  label?: string;
  placeholder?: string;
  error?: string;
  [css: string]: any;
};

export type InputType = 'password' | 'text' | 'email' | 'file';
