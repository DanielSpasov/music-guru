import { Artist } from '../../../Types/Artist';

const lightImgProps = 'shadow-neutral-400';
const darkImgProps = 'dark:shadow-neutral-900';
const imgProps = `${lightImgProps} ${darkImgProps}`;

export default function Image({ artist }: { artist: Artist }) {
  return (
    <div className="flex flex-col items-center">
      <img
        src={artist.image}
        alt={artist.name}
        className={`h-72 w-72 shadow-lg rounded-full ${imgProps}`}
        loading="lazy"
      />
      <h2 className="py-2">{artist.name}</h2>
      <p>AKA: </p>
    </div>
  );
}
