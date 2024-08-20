import { FC, memo } from 'react';

import { icons, iconColors } from './icons';
import { SocialsProps } from './types';

import css from './index.module.css';

const Socials: FC<SocialsProps> = ({ links }) => {
  return (
    <div className="flex justify-center gap-4 p-4" data-testid="socials">
      {links.map((link, i) => {
        const Icon = icons[link.name];
        return (
          <div
            key={i}
            data-testid={`socials-${i}`}
            onClick={() => window.open(link.url, '_blank')}
            className={`${css.link} ${iconColors[link.name]}`}
          >
            <div className={iconColors[link.name]} />
            <div className={iconColors[link.name]} />
            <div className={iconColors[link.name]}>
              <Icon />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(Socials);
