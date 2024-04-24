import { Icon, IconModel } from '../../../Components';
import { Artist } from '../../../Types/Artist';

const socialsColors: Record<string, string> = {
  instagram: '[&>path]:hover:fill-[#E1306C]',
  x: '[&>path]:hover:fill-[#000000]',
  facebook: '[&>path]:hover:fill-[#4267B2]',
  spotify: '[&>path]:hover:fill-[#1DB954]',
  apple_music: '[&>path]:hover:fill-[#fc3c44]',
  youtube: '[&>path]:hover:fill-[#FF0000]',
  soundcloud: '[&>path]:hover:fill-[#ff7700]'
};

export default function Socials({ artist }: { artist: Artist }) {
  return (
    <div className="flex w-full flex-wrap justify-center py-3 gap-3">
      {artist.links.map(({ name, url }) => (
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
