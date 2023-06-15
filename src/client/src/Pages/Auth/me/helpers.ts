export type OptionMenuProps = {
  icon: {
    model: string;
    type: string;
  };
  label: string;
  data: { name: string; value?: string }[];
};
