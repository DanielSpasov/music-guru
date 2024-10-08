import { FC } from 'react';

import { FooterProps } from './types';

const Footer: FC<FooterProps> = ({ children }) => {
  return (
    <footer
      data-testid="footer"
      className="bg-neutral-100 dark:bg-neutral-900 border-t-[1px] border-t-neutral-200 dark:border-t-neutral-700"
    >
      {children}
    </footer>
  );
};

export default Footer;
