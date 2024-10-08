import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Button, IPlus } from '../../../../../Components';
import { Disc as IDisc } from '../../../../../Types';
import { DiscsProps } from './types';
import Api from '../../../../../Api';

import css from './index.module.css';

// Composables
import Disc from '../Disc';

const Tracklist: FC<DiscsProps> = ({
  discs: defaultValue = [],
  isEditor,
  hasLinks
}) => {
  const { id = '0' } = useParams();

  const [discs, setDiscs] = useState<IDisc[]>(defaultValue);
  const [loading, setLoading] = useState(false);

  useEffect(() => setDiscs(defaultValue), [defaultValue]);

  const fetchDiscData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await Api.albums.get({ id });
      setDiscs(data.discs);
    } catch (err) {
      toast.error('Failed to fetch disc data.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  const deleteDisc = useCallback(
    async (number: number) => {
      try {
        await Api.albums.discs.del({ number, uid: id });
        await fetchDiscData();
        toast.success('Disc deleted sucessfully');
      } catch (err) {
        toast.error('Failed to delete disc.');
      }
    },
    [id, fetchDiscData]
  );

  const postSongs = useCallback(
    async (songs: string[], disc: number) => {
      try {
        await Api.albums.songs.post({ songs, disc, uid: id });
        await fetchDiscData();
        toast.success('Songs added sucessfully');
      } catch (err) {
        toast.error('Failed to add songs.');
      }
    },
    [id, fetchDiscData]
  );

  const patchSongs = useCallback(
    async (songs: string[], disc: number) => {
      try {
        await Api.albums.songs.patch({ songs, disc, uid: id });
        await fetchDiscData();
        toast.success('Song removed sucessfully');
      } catch (err) {
        toast.error('Failed to removed song.');
      }
    },
    [id, fetchDiscData]
  );

  return (
    <article className={`${css.tracklistWrapper} `}>
      <div className={css.tracklistHeader}>
        <h2>Tracklist</h2>
        {isEditor && (
          <Button
            variant="outline"
            onClick={() =>
              setDiscs(prev => [
                ...prev,
                { number: prev.length + 1, songs: [] }
              ])
            }
          >
            <IPlus />
            Add Disc
          </Button>
        )}
      </div>

      {!discs.length && (
        <p className="p-1">
          This album doesn&apos;t have any discs yet, add the first one.
        </p>
      )}

      <div
        className={`${css.tracklist} ${
          hasLinks ? 'xl:h-[calc(100vh-310px)]' : 'xl:h-[calc(100vh-210px)]'
        }`}
      >
        {discs
          .sort((discA, discB) => discA.number - discB.number)
          .map((disc, i) => (
            <Disc
              disc={disc}
              onDelete={deleteDisc}
              onAddSongs={postSongs}
              onRemoveSongs={patchSongs}
              loading={loading}
              isEditor={isEditor}
              key={i}
            />
          ))}
      </div>
    </article>
  );
};

export default memo(Tracklist);
