import { ElementType } from 'react';

export type TableRowProps = {
  Icon: ElementType;
  label: string;
  value: boolean;
  action?: {
    label: string;
    onClick: () => Promise<void> | void;
    disabled?: boolean;
    loading?: boolean;
  };
};
