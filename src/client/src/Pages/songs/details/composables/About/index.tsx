import { FC } from 'react';

import { AboutProps } from './types';

const About: FC<AboutProps> = ({ song }) => {
  return (
    <div className="w-full mt-3 p-4 bg-neutral-200 dark:bg-neutral-700 rounded-md">
      <h2>About &quot;{song.name}&quot;</h2>
      <span>{song.about}</span>
    </div>
  );
};

export default About;
