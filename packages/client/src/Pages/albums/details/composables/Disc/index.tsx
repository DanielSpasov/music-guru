import { FC, memo, useCallback, useState } from 'react';

import {
  IDisc,
  IPlus,
  ISettings,
  ITrashBin,
  Modal,
  Table
} from '../../../../../Components';
import { ListSong } from '../../../../../Types';
import Api from '../../../../../Api';
import { DiscProps } from './types';

import css from './index.module.css';

// Composables
import Song from '../Song';

const Disc: FC<DiscProps> = ({
  disc,
  artist,
  loading,
  onDelete,
  onAddSongs,
  onRemoveSong
}) => {
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

  return (
    <section className={css.disc}>
      <div className={css.discHeader}>
        <IDisc />

        <h3>Disc {disc.number}</h3>

        <div className={css.horizontalLine} />

        <IPlus onClick={() => setOpenAddSongs(true)} disabled={loading} />
        <ISettings
          onClick={() => setIsEditing(prev => !prev)}
          disabled={loading}
        />
        <ITrashBin onClick={() => onDelete(disc.number)} disabled={loading} />
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
            onRemove={async () => {
              await onRemoveSong([song.uid], disc.number);
            }}
          />
        ))}

      <Modal
        title={`Add Songs to Disc ${disc.number}`}
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
              onClick: async songs => {
                await onAddSongs(songs, disc.number);
                setOpenAddSongs(false);
              }
            }
          ]}
        />
      </Modal>
    </section>
  );
};

export default memo(Disc);
