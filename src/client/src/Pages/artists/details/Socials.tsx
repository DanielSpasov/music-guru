import { Icon, IconModel } from '../../../Components';
import { Artist } from '../../../Types/Artist';

const socialsColors: Record<string, string> = {
  instagram: '#E1306C',
  x: '#000000',
  facebook: '#4267B2',
  spotify: '#1DB954',
  apple_music: '#fc3c44',
  youtube: '#FF0000',
  soundcloud: '#ff7700'
};

export default function Socials({ artist }: { artist: Artist }) {
  return (
    <div className="flex w-full flex-wrap justify-center py-3 gap-3">
      {artist.links.map(({ name, url }) => (
        <Icon
          className={`[&>path]:hover:fill-[${socialsColors[name]}]`}
          onClick={() => window.open(url, '_blank')}
          model={name as IconModel}
          key={name}
        />
      ))}
    </div>
  );
}
