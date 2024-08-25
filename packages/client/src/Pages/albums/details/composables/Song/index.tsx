import { FC, Fragment, memo, useCallback, useContext, useState } from 'react';
import { CSS, Transform } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { toast } from 'react-toastify';

import {
  IHamburger,
  IHeart,
  IHeartOutline,
  IX,
  Link
} from '../../../../../Components';
import { AuthContext } from '../../../../../Contexts';
import Api from '../../../../../Api';
import { SongPrps } from './types';

import css from './index.module.css';

const limitXMovement = (transform: Transform | null): string | undefined => {
  if (!transform) return undefined;
  return CSS.Transform.toString({
    scaleX: transform.scaleX,
    scaleY: transform.scaleY,
    y: transform.y,
    x: 0
  });
};

const Song: FC<SongPrps> = ({
  song,
  isEditing,
  isSelected,
  isOrdering,
  onSelect
}) => {
  const { data, isAuthenticated, dispatch } = useContext(AuthContext);

  const { setNodeRef, attributes, listeners, transition, transform } =
    useSortable({ id: song.uid, disabled: !isOrdering });

  const [counter, setCounter] = useState(song.favorites);
  const [loading, setLoading] = useState(false);

  const updateFavoriteData = useCallback(
    (uid: string) => {
      if (!data) return;
      const isFavorite = data.favorites.songs?.includes(uid);

      setCounter(prev => (isFavorite ? prev - 1 : prev + 1));
      dispatch({
        type: 'UPDATE',
        payload: {
          data: {
            ...data,
            favorites: {
              ...data?.favorites,
              songs: isFavorite
                ? data.favorites.songs?.filter(x => x !== uid)
                : [...(data.favorites.songs || []), uid]
            }
          }
        }
      });
    },
    [data, dispatch]
  );

  const onFavorite = useCallback(
    async (uid: string) => {
      try {
        if (!isAuthenticated) return;

        setLoading(true);
        updateFavoriteData(uid);
        await Api.songs.favorite({ uid });
      } catch (err) {
        toast.error('Failed to favorite song.');
        updateFavoriteData(uid);
      } finally {
        setLoading(false);
      }
    },
    [updateFavoriteData, isAuthenticated]
  );

  return (
    <article
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transition,
        transform: limitXMovement(transform)
      }}
      className={css.songWrapper}
    >
      <section>
        <div
          className={`${css.checkbox} ${
            isSelected ? css.selectedCheckbox : ''
          }`}
          onClick={e => {
            e.stopPropagation();
            if (isEditing) onSelect();
          }}
        >
          {isEditing && isSelected && <IX />}
          {!isEditing && <p className="font-semibold">{song.number}</p>}
        </div>

        <img src={song.image} alt={song.name} />

        <div onClick={e => e.stopPropagation()} className={css.linksBox}>
          <Link className="font-semibold" type="link" to={`/songs/${song.uid}`}>
            {song.name}
          </Link>

          <p>
            <Link type="link" to={`/artists/${song.artist.uid}`}>
              {song.artist.name}
            </Link>
            {song.features.map(feature => (
              <Fragment key={feature.uid}>
                ,{' '}
                <Link type="link" to={`/artists/${feature.uid}`}>
                  {feature.name}
                </Link>
              </Fragment>
            ))}
          </p>
        </div>
      </section>

      {!isOrdering && (
        <div className={css.favoritesBox}>
          <p>{counter}</p>
          {data?.favorites?.songs?.includes(song.uid) ? (
            <IHeart
              disabled={loading || !isAuthenticated}
              onClick={() => onFavorite(song.uid)}
            />
          ) : (
            <IHeartOutline
              disabled={loading || !isAuthenticated}
              onClick={() => onFavorite(song.uid)}
            />
          )}
        </div>
      )}

      {isOrdering && <IHamburger className="cursor-pointer" />}
    </article>
  );
};

export default memo(Song);
