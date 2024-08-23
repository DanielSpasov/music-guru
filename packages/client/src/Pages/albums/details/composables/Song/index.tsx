import { useSortable } from '@dnd-kit/sortable';
import { FC, Fragment, memo } from 'react';
import { CSS } from '@dnd-kit/utilities';

import { IHamburger, IX } from '../../../../../Components';
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

        <div>
          <h3>{song.name}</h3>

          <p onClick={e => e.stopPropagation()}>
            <span>{song.artist.name}</span>
            {song.features.map(feature => (
              <Fragment key={feature.uid}>
                <span>, {feature.name}</span>
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
