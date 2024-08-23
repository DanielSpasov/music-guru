import { useSortable } from '@dnd-kit/sortable';
import { FC, Fragment, memo } from 'react';
import { CSS } from '@dnd-kit/utilities';

import { IHamburger, IX, Link } from '../../../../../Components';
import { SongPrps } from './types';

import css from './index.module.css';

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
        transform: CSS.Transform.toString(transform)
      }}
      className={css.song}
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

        <div onClick={e => e.stopPropagation()}>
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

      {isOrdering && <IHamburger />}
    </article>
  );
};

export default memo(Song);
