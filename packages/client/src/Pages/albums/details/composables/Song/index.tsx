import { CSS, Transform } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { FC, Fragment, memo } from 'react';

import { IHamburger, IX, Link } from '../../../../../Components';
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
  const { setNodeRef, attributes, listeners, transition, transform } =
    useSortable({ id: song.uid, disabled: !isOrdering });

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

      {isOrdering && <IHamburger className="cursor-pointer" />}
    </article>
  );
};

export default memo(Song);
