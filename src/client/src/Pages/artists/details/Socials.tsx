import { Icon } from '../../../Components';
import { Artist } from '../helpers';

export default function Socials({ artist }: { artist: Artist }) {
  console.log(artist);
  return (
    <div className="flex w-full flex-wrap justify-center py-3 gap-3">
      <Icon
        className="[&>path]:hover:fill-[#E1306C]"
        onClick={() => window.open('https://www.instagram.com', '_blank')}
        model="instagram"
      />
      <Icon
        className="[&>path]:hover:fill-[#000000]"
        onClick={() => window.open('https://www.instagram.com', '_blank')}
        model="x"
      />
      <Icon
        className="[&>path]:hover:fill-[#4267B2]"
        onClick={() => window.open('https://www.instagram.com', '_blank')}
        model="facebook"
      />
      <Icon
        className="[&>path]:hover:fill-[#1DB954]"
        onClick={() => window.open('https://www.instagram.com', '_blank')}
        model="spotify"
      />
      <Icon
        className="[&>path]:hover:fill-[#fc3c44]"
        onClick={() => window.open('https://www.instagram.com', '_blank')}
        model="apple-music"
      />
      <Icon
        className="[&>path]:hover:fill-[#FF0000]"
        onClick={() => window.open('https://www.instagram.com', '_blank')}
        model="youtube"
      />
      <Icon
        className="[&>path]:hover:fill-[#ff7700]"
        onClick={() => window.open('https://www.instagram.com', '_blank')}
        model="soundcloud"
      />
    </div>
  );
}
