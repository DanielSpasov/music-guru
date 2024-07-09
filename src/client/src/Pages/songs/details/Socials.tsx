import {
  ISpotify,
  IYoutube,
  IAppleMusic,
  ISoundcloud
} from '../../../Components';
import { Song } from '../../../Types';

const socialsColors: Record<string, string> = {
  spotify: '[&>path]:hover:fill-[#1DB954]',
  apple_music: '[&>path]:hover:fill-[#fc3c44]',
  youtube: '[&>path]:hover:fill-[#FF0000]',
  soundcloud: '[&>path]:hover:fill-[#ff7700]'
};

const icons = {
  spotify: ISpotify,
  apple_music: IAppleMusic,
  youtube: IYoutube,
  soundcloud: ISoundcloud
};

export default function Socials({ song }: { song: Song }) {
  return (
    <div className="flex w-full flex-wrap justify-center py-3 gap-3">
      {song.links.map(({ name, url }) => {
        const Component = icons[name as keyof typeof icons];
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
}
