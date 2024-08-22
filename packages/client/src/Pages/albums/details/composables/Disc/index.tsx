import { useNavigate, useParams } from 'react-router-dom';
import { FC, memo, useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { Button, IDisc, IPlus, Modal, Table } from '../../../../../Components';
import { ListSong } from '../../../../../Types';
import Api from '../../../../../Api';
import { DiscsProps } from './types';

import css from './indeex.module.css';

const Discs: FC<DiscsProps> = ({ discs: _discs = [], artist }) => {
  const { id = '0' } = useParams();

  const navigate = useNavigate();

  const [openAddSongs, setOpenAddSongs] = useState(false);
  const [discs, setDiscs] = useState(_discs);

  const fetchArtistSongs = useCallback(() => {
    return Api.songs.fetch({
      config: {
        params: {
          'artist.uid': artist
          //   '-uid': discs.flat().join(', ') || null
        }
      }
    });
  }, [artist]);

  const postSongs = useCallback(
    async (songs: string[], disc: number) => {
      try {
        await Api.albums.songs.post({ songs, disc, uid: id });
        // setDiscs(prev => [...prev, ...songsUids]);
        // toast.success('Songs added sucessfully');
      } catch (err) {
        toast.error('Failed to add songs.');
      }
    },
    [id]
  );

  return (
    <article className={css.discsWrapper}>
      <div className="flex items-center justify-between">
        <h2>Discs</h2>
        <Button
          variant="outline"
          onClick={() =>
            setDiscs(prev => [...prev, { number: prev.length, songs: [] }])
          }
        >
          <IPlus />
          Add Disc
        </Button>
      </div>

      {!discs.length && (
        <p className="p-1">
          This album doesn&apos;t have any discs yet, add the first one.
        </p>
      )}

      {discs
        .sort((discA, discB) => discA.number - discB.number)
        .map(({ songs }, disc) => (
          <section className="flex flex-col py-2" key={disc}>
            <div className="flex items-center gap-2">
              <IDisc />
              <h3 className="font-semibold whitespace-nowrap">
                Disc {disc + 1}
              </h3>
              <div className="h-[1px] w-full bg-neutral-700" />
              <Button variant="outline" onClick={() => setOpenAddSongs(true)}>
                <IPlus />
                <p className="whitespace-nowrap">Add Songs</p>
              </Button>
            </div>

            {!songs.length && (
              <p className="p-1">
                This disc doesn&apos;t have any songs yet, add the first one.
              </p>
            )}

            {songs
              .sort((songA, songB) => songA.number - songB.number)
              .map((song, i) => {
                return (
                  <article
                    className="flex items-center gap-2 m-1 hover:bg-neutral-700 rounded-md p-2 cursor-pointer"
                    onClick={() => navigate(`/songs/${song.uid}`)}
                    key={i}
                  >
                    <p className="w-4">{song.number + 1}</p>

                    <img
                      className="w-20 h-20"
                      src={song.image}
                      alt={song.name}
                    />

                    <div className="flex flex-col">
                      <p className="font-semibold text-xl">{song.name}</p>
                      <p className="text-xl text-neutral-400">
                        {song.artist.name}
                      </p>
                    </div>
                  </article>
                );
              })}

            <Modal
              title="Add Songs"
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
                    onClick: songs => postSongs(songs, disc)
                  }
                ]}
              />
            </Modal>
          </section>
        ))}
    </article>
  );
};

export default memo(Discs);
