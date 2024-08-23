import { FC, memo, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  IDisc,
  IPlus,
  ISettings,
  Modal,
  Table
} from '../../../../../Components';
import { ListSong } from '../../../../../Types';
import Api from '../../../../../Api';
import { DiscProps } from './types';

// Composables
import Song from '../Song';

const Disc: FC<DiscProps> = ({ disc, artist }) => {
  const { id = '0' } = useParams();

  const [openAddSongs, setOpenAddSongs] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const fetchArtistSongs = useCallback(() => {
    // const songsInAlbum = discs
    //   .map(disc => [...disc.songs.map(song => song.uid)])
    //   .flat();

    return Api.songs.fetch({
      config: {
        params: {
          'artist.uid': artist
          // '-uid': songsInAlbum.join(',') || null
        }
      }
    });
  }, [artist]);

  const postSongs = useCallback(
    async (songs: string[], disc: number) => {
      try {
        await Api.albums.songs.post({ songs, disc, uid: id });
        toast.success('Songs added sucessfully');
      } catch (err) {
        toast.error('Failed to add songs.');
      } finally {
        setOpenAddSongs(false);
      }
    },
    [id]
  );

  const patchSongs = useCallback(
    async (songs: string[], disc: number) => {
      try {
        await Api.albums.songs.patch({ songs, disc, uid: id });
        toast.success('Song removed sucessfully');
      } catch (err) {
        toast.error('Failed to removed song.');
      }
    },
    [id]
  );

  return (
    <section className="flex flex-col py-2">
      <div className="flex items-center gap-2">
        <IDisc className="w-7 h-7 flex flex-shrink-0" />

        <h3 className="font-semibold whitespace-nowrap">
          Disc {disc.number + 1}
        </h3>

        <div className="h-[1px] w-full bg-neutral-700" />

        <IPlus className="w-10 h-10" onClick={() => setOpenAddSongs(true)} />
        <ISettings
          className="w-10 h-10"
          onClick={() => setIsEditing(prev => !prev)}
        />
      </div>

      {!disc.songs.length && (
        <p className="p-1">
          This disc doesn&apos;t have any songs yet, add the first one.
        </p>
      )}

      {disc.songs
        .sort((songA, songB) => songA.number - songB.number)
        .map(song => (
          <Song
            key={song.number}
            song={song}
            isEditing={isEditing}
            onRemove={() => patchSongs([song.uid], disc.number)}
          />
        ))}

      <Modal
        title={`Add Songs to Disc ${disc.number + 1}`}
        open={openAddSongs}
        setOpen={setOpenAddSongs}
      >
        <Table<ListSong>
          cols={[{ key: 'name', label: 'Name' }]}
          fetchFn={fetchArtistSongs}
          bulkActions={[
            {
              Icon: IPlus,
              label: 'Add',
              onClick: songs => postSongs(songs, disc.number)
            }
          ]}
        />
      </Modal>
    </section>
  );
};

export default memo(Disc);
