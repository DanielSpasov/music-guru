import { FC, memo } from 'react';

import { icons, iconColors } from './icons';
import { SocialsProps } from './types';

import css from './Socials.module.css';

const Socials: FC<SocialsProps> = ({ links }) => {
  return (
    <div className="flex justify-center gap-4">
      {links.map((link, i) => {
        const Icon = icons[link.name];
        return (
          <div
            key={i}
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