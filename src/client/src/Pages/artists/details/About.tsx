import { Artist } from '../helpers';

export default function About({ artist }: { artist: Artist }) {
  return (
    <div className="mt-3 p-3 w-full bg-neutral-700 rounded-md">
      <h2>About &quot;{artist.name}&quot;</h2>
      <span>{artist?.bio}</span>
    </div>
  );
}