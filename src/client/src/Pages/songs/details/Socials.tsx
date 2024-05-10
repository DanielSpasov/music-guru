import { Icon, IconModel } from '../../../Components';
import { Song } from '../../../Types/Song';

const socialsColors: Record<string, string> = {
  spotify: '[&>path]:hover:fill-[#1DB954]',
  apple_music: '[&>path]:hover:fill-[#fc3c44]',
  youtube: '[&>path]:hover:fill-[#FF0000]',
  soundcloud: '[&>path]:hover:fill-[#ff7700]'
};

export default function Socials({ song }: { song: Song }) {
  return (
    <div className="flex w-full flex-wrap justify-center py-3 gap-3">
      {song.links.map(({ name, url }) => (
        <Icon
          className={socialsColors[name]}
          onClick={() => window.open(url, '_blank')}
          model={name as IconModel}
          key={name}
        />
      ))}
    </div>
  );
}
