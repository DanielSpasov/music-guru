import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  memo,
  useCallback,
  useState
} from 'react';

import { FiltersProps } from './types';

import css from './Filters.module.css';

const Filters: FC<FiltersProps> = ({ config = [], onApply }) => {
  const [params, setParams] = useState({});

  const onFilterChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setParams(prev => ({
      ...prev,
      [e.target.name]: e.target.value || undefined
    }));
  }, []);

  const onEnterClick = useCallback(
    (key: KeyboardEvent) => {
      if (key.code !== 'Enter') return;
      onApply({ params });
    },
    [onApply, params]
  );

  return (
    <div className="flex w-full h-full px-2" data-testid="list-filters">
      {config.map(filter => (
        <div
          key={filter.key}
          data-testid="list-filter"
          className={css.filterWrapper}
        >
          <input
            data-testid="list-filter-input"
            placeholder={filter?.placeholder || 'Search...'}
            name={filter.key}
            onKeyDown={onEnterClick}
            onChange={onFilterChange}
          />
          <p data-testid="list-filter-label">{filter.label}</p>
        </div>
      ))}
    </div>
  );
};

export default memo(Filters);
