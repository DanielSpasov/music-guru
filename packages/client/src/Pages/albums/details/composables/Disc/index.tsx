import { FC, memo, useCallback, useEffect, useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  UniqueIdentifier,
  closestCorners
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { AxiosRequestConfig } from 'axios';

import {
  Button,
  IDisc,
  IHamburger,
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
  loading,
  isEditor,
  onDelete,
  onAddSongs,
  onRemoveSongs
}) => {
  const { id = '0' } = useParams();

  const [openAddSongs, setOpenAddSongs] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [isOrdering, setIsOrdering] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [songs, setSongs] = useState(disc.songs);

  useEffect(() => setSongs(disc.songs), [disc.songs]);

  const fetchArtistSongs = useCallback(
    async (config?: AxiosRequestConfig) => {
      const { data, pagination } = await Api.albums.songs.fetch({
        uid: id,
        config
      });

      return {
        pagination,
        data: data.map((x: ListSong) => ({ ...x, artistName: x.artist.name }))
      };
    },
    [id]
  );

  const onSelect = useCallback(
    (uid: string) => {
      if (selected.includes(uid)) {
        setSelected(prev => prev.filter(x => x !== uid));
        return;
      }
      setSelected(prev => [...prev, uid]);
    },
    [selected]
  );

  const onSaveEdit = useCallback(async () => {
    try {
      await onRemoveSongs(selected, disc.number);

      setIsEditing(false);
      setSelected([]);

      toast.success('Changes saved.');
    } catch (err) {
      toast.error('Failed to save changes.');
    }
  }, [selected, disc.number, onRemoveSongs]);

  const onSaveOrder = useCallback(async () => {
    try {
      await Api.albums.songs.put({
        songs: songs.map(x => ({ number: x.number, uid: x.uid })),
        disc: disc.number,
        uid: id
      });

      setIsOrdering(false);

      toast.success('Changes saved.');
    } catch (err) {
      toast.error('Failed to save changes.');
    }
  }, [songs, disc.number, id]);

  const getSongPosition = useCallback(
    (id?: UniqueIdentifier) => songs.findIndex(song => song.uid === id),
    [songs]
  );

  const onDragEnd = useCallback(
    (e: DragEndEvent) => {
      if (e.active.id === e.over?.id) return;

      setSongs(prev => {
        const oldPosition = getSongPosition(e.active.id);
        const newPosition = getSongPosition(e.over?.id);
        const reorderedSongs = arrayMove(prev, oldPosition, newPosition);
        return reorderedSongs.map((song, index) => ({
          ...song,
          number: index + 1
        }));
      });
    },
    [getSongPosition]
  );

  return (
    <section className={css.disc}>
      <div className={css.discHeader}>
        <IDisc className={css.discIcon} />

        <h3>Disc {disc.number}</h3>

        <div className={css.horizontalLine} />

        {isEditor && (
          <div className="flex gap-1">
            <IPlus
              onClick={() => setOpenAddSongs(true)}
              disabled={loading || isEditing || isOrdering}
            />
            <ITrashBin
              onClick={async () => {
                await onDelete(disc.number);
              }}
              disabled={loading || isEditing || isOrdering}
            />
            <ISettings
              onClick={() => {
                setIsEditing(prev => !prev);
                setSelected([]);
              }}
              disabled={loading || isOrdering}
            />
            <IHamburger
              onClick={() => {
                setIsOrdering(prev => !prev);
              }}
              disabled={loading || isEditing}
            />
          </div>
        )}
      </div>

      {!songs.length && (
        <p className="p-1">
          This disc doesn&apos;t have any songs yet, add the first one.
        </p>
      )}

      <DndContext collisionDetection={closestCorners} onDragEnd={onDragEnd}>
        <SortableContext
          items={songs.map(x => ({ ...x, id: x.uid }))}
          strategy={verticalListSortingStrategy}
        >
          {songs.map(song => (
            <Song
              key={song.number}
              song={song}
              isEditing={isEditing}
              isOrdering={isOrdering}
              isSelected={selected.includes(song.uid)}
              onSelect={() => onSelect(song.uid)}
            />
          ))}
        </SortableContext>
      </DndContext>

      {isEditing && (
        <Button
          variant="outline"
          className="w-1/3 self-end mt-1 justify-center"
          onClick={() => onSaveEdit()}
        >
          Save Changes
        </Button>
      )}
      {isOrdering && (
        <Button
          variant="outline"
          className="w-1/3 self-end mt-1 justify-center"
          onClick={() => onSaveOrder()}
        >
          Save Changes
        </Button>
      )}

      <Modal
        title={`Add Songs to Disc ${disc.number}`}
        open={openAddSongs}
        setOpen={setOpenAddSongs}
      >
        <Table<ListSong & { artistName: string }>
          cols={[
            { key: 'name', label: 'Name' },
            { key: 'artistName', label: 'Artist' },
            { key: 'favorites', label: 'Favorites' }
          ]}
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
