import { FC } from 'react';

import { icons, socialsColors } from './icons';
import { SocialsProps } from './types';

const Socials: FC<SocialsProps> = ({ artist }) => {
  return (
    <div className="flex w-full flex-wrap justify-center py-3 gap-3">
      {artist.links.map(({ name, url }) => {
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
