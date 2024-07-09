import { Artist } from '../../../Types';

const About = ({ artist }: { artist: Artist }) => {
  return (
    <div className="mt-3 p-3 w-full bg-neutral-200 dark:bg-neutral-700 rounded-md">
      <h2>About &quot;{artist.name}&quot;</h2>
      <span>{artist.about}</span>
    </div>
  );
};

export default About;
