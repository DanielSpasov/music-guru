import { useNavigate } from 'react-router-dom';
import { FC, Fragment, memo } from 'react';

import { ITrashBin, Link } from '../../../../../Components';
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
        <p>{song.number}</p>

        <img src={song.image} alt={song.name} />

        <div>
          <h3>{song.name}</h3>

          <p onClick={e => e.stopPropagation()}>
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
