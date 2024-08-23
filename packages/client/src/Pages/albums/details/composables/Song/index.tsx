import { useNavigate } from 'react-router-dom';
import { FC, memo } from 'react';

import { IHamburger, ITrashBin } from '../../../../../Components';
import { SongPrps } from './types';

import css from './index.module.css';

const Song: FC<SongPrps> = ({ song, isEditing, onRemove }) => {
  const navigate = useNavigate();

  return (
    <article
      className={css.song}
      onClick={() => navigate(`/songs/${song.uid}`)}
    >
      <section>
        <p>{song.number + 1}</p>

        <img src={song.image} alt={song.name} />

        <div>
          <h3>{song.name}</h3>
          <p>{song.artist.name}</p>
        </div>
      </section>

      {!isEditing && <IHamburger />}

      {isEditing && (
        <ITrashBin
          className="w-6 h-6"
          onClick={e => {
            e.stopPropagation();
            onRemove();
          }}
        />
      )}
    </article>
  );
};

export default memo(Song);
