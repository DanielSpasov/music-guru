export type InputProps = {
  onChange: Function;
  open: boolean;
  value: string;
  placeholder?: string;
  [css: string]: any;
};

export type ResultsProps = {
  results: any[];
  open: boolean;
  loading: boolean;
  toggleOpen: Function;
};
