import { FC } from 'react';

import { SocialsProps } from './types';
import { icons, socialsColors } from './icons';

const Socials: FC<SocialsProps> = ({ song }) => {
  return (
    <div className="flex w-full flex-wrap justify-center py-3 gap-3">
      {song.links.map(({ name, url }) => {
        const Component = icons[name];
        return (
          <Component
            className={socialsColors[name]}
            onClick={() => window.open(url, '_blank')}
            key={name}
          />
        );
      })}
    </div>
  );
};

export default Socials;
