import { FC, memo, useCallback, useState } from 'react';

import { Sorting as ISorting } from '../../types';
import { ICheck, IDown, IUp } from '../../../..';
import { SortingProps } from './types';
import Popover from '../../../Popover';

import css from './Sorting.module.css';

const Sorting: FC<SortingProps> = ({ config = [], onApply }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<ISorting>({
    key: 'created_at',
    label: 'Latest'
  });

  const onOptionSelect = useCallback(
    (option: ISorting) => {
      const sort = selected.key === option.key ? `-${option.key}` : option.key;
      onApply({ params: { sort } });
      setSelected(option);
    },
    [selected, onApply]
  );

  return (
    <div className="flex h-full px-2">
      <Popover
        open={open}
        z="z-[1]"
        label={
          <div
            data-testid="sort-menu-label"
            onClick={() => setOpen(prev => !prev)}
            className={`${css.sortButton} ${open ? css.sortButtonHover : ''}`}
          >
            {selected.label}
            {selected.key.startsWith('-') ? <IDown /> : <IUp />}
          </div>
        }
      >
        <div className="flex flex-col gap-1">
          {config.map(option => (
            <p
              key={option.key}
              data-testid="sort-option"
              className={`${css.sortOption} ${
                option.key === selected.key ? css.sortOptionHover : ''
              }`}
              onClick={() => onOptionSelect(option)}
            >
              {option.label}
              {option.key === selected.key && (
                <ICheck className="w-6 h-6" color="[&>path]:fill-green-500" />
              )}
            </p>
          ))}
        </div>
      </Popover>
    </div>
  );
};

export default memo(Sorting);
