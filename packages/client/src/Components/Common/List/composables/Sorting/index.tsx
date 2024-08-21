import { FC, memo, useCallback, useState } from 'react';

import { Sorting as ISorting } from '../../types';
import { ISortAsc, ISortDesc } from '../../../..';
import { SortingProps } from './types';
import Popover from '../../../Popover';

import css from './index.module.css';

const Sorting: FC<SortingProps> = ({ config = [], setValue }) => {
  const [selected, setSelected] = useState({ ...config[0], type: 'asc' });
  const [open, setOpen] = useState(false);

  const onOptionSelect = useCallback(
    (option: ISorting, type: 'asc' | 'desc') => {
      if (option.key === selected.key && type === selected.type) return;
      setValue(`${type === 'desc' ? '-' : ''}${option.key}`);
      setSelected({ ...option, type });
    },
    [setValue, selected]
  );

  return (
    <article className="flex px-2" data-testid="list-sorting">
      <Popover
        open={open}
        z="z-[1]"
        label={
          <article
            data-testid="sort-menu-button"
            onClick={() => setOpen(prev => !prev)}
            className={`${css.sortButton} ${open ? css.sortButtonHover : ''}`}
          >
            <p data-testid="sort-menu-active-label">{selected.label}</p>
            {selected.type === 'asc' ? (
              <ISortAsc
                className={css.icon}
                data-testid="sort-menu-active-asc"
              />
            ) : (
              <ISortDesc
                className={css.icon}
                data-testid="sort-menu-active-desc"
              />
            )}
          </article>
        }
      >
        <section
          className="flex flex-col gap-1"
          data-testid="sort-menu-content"
        >
          {config.map(option => (
            <article
              key={option.key}
              data-testid={`sort-option-${option.key}`}
              className={css.sortOption}
            >
              <p data-testid={`sort-option-${option.key}-label`}>
                {option.label}
              </p>
              <div className="flex">
                <ISortAsc
                  className={css.icon}
                  data-testid={`sort-option-${option.key}-asc-icon`}
                  onClick={() => onOptionSelect(option, 'asc')}
                  color={
                    option.key === selected.key && selected.type === 'asc'
                      ? css.activeIcon
                      : ''
                  }
                />
                <ISortDesc
                  className={css.icon}
                  data-testid={`sort-option-${option.key}-desc-icon`}
                  onClick={() => onOptionSelect(option, 'desc')}
                  color={
                    option.key === selected.key && selected.type === 'desc'
                      ? css.activeIcon
                      : ''
                  }
                />
              </div>
            </article>
          ))}
        </section>
      </Popover>
    </article>
  );
};

export default memo(Sorting);
