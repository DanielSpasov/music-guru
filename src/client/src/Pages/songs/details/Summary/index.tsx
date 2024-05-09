import { Image } from '../../../../Components';
import { SummaryProps } from './types';
import Item from './Item';

export default function Summary({
  song,
  albums,
  userUID,
  updateImage
}: SummaryProps) {
  return (
    <section className="flex flex-col w-1/2 items-start text-white">
      <div className="flex mb-10">
        <Image
          src={song?.image || ''}
          alt={song.name}
          editable={song.created_by === userUID}
          size={64}
          className="rounded-lg"
          updateFn={updateImage}
        />

        <div className="flex flex-col gap-2 px-4">
          <Item
            label="Artist"
            type="link"
            linkType="artists"
            value={song.artist}
          />

          <Item label="Release Date" type="date" value={song.release_date} />

          <Item
            label="Features"
            type="links"
            linkType="artists"
            value={song.features}
          />

          <Item label="Producers" type="links" linkType="artists" value={[]} />

          <Item label="Writers" type="links" linkType="artists" value={[]} />

          <Item label="Albums" type="links" linkType="albums" value={albums} />
        </div>
      </div>
    </section>
  );
}
