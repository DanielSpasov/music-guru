import { FC, memo, useState } from 'react';

import { Button, IPlus } from '../../../../../Components';
import { Disc as IDisc } from '../../../../../Types';
import { DiscsProps } from './types';

import css from './indeex.module.css';

// Composables
import Disc from '../Disc';

const Discs: FC<DiscsProps> = ({ discs: _discs = [], artist }) => {
  const [discs, setDiscs] = useState<IDisc[]>(_discs);

  return (
    <article className={css.discsWrapper}>
      <div className="flex items-center justify-between">
        <h2>Discs</h2>
        <Button
          variant="outline"
          onClick={() =>
            setDiscs(prev => [...prev, { number: prev.length + 1, songs: [] }])
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
        .map((disc, i) => (
          <Disc disc={disc} artist={artist} key={i} />
        ))}
    </article>
  );
};

export default memo(Discs);
