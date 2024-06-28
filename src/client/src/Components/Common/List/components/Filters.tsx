import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  memo,
  useCallback,
  useState
} from 'react';

import { FiltersProps, hoverProps, iconProps, themeProps } from './helpers';
import { IMagnifyingGlass } from '../../../Icons';

const Filters: FC<FiltersProps> = ({ config = [], onApplyFilters }) => {
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
      onApplyFilters({ params });
    },
    [onApplyFilters, params]
  );

  return (
    <div
      className={`flex items-center h-16 my-4 p-1 rounded-full ${themeProps}`}
      data-testid="list-filters"
    >
      {config.map(filter => (
        <div
          key={filter.key}
          data-testid="list-filter"
          className={`flex flex-col justify-center px-4 mr-2 rounded-full h-full ${hoverProps}`}
        >
          <p className="font-bold text-sm" data-testid="list-filter-label">
            {filter.label}
          </p>
          <input
            data-testid="list-filter-input"
            className="outline-none bg-transparent text-md truncate"
            placeholder={filter?.placeholder || 'Search...'}
            name={filter.key}
            onKeyDown={onEnterClick}
            onChange={onFilterChange}
          />
        </div>
      ))}

      <div
        className={`rounded-full p-2 [&>svg>path]:text-white hover:opacity-75 cursor-pointer ${iconProps}`}
        tabIndex={0}
        onClick={() => onApplyFilters({ params })}
        data-testid="list-filter-submit"
        onKeyDown={onEnterClick}
      >
        <IMagnifyingGlass />
      </div>
    </div>
  );
};

export default memo(Filters);
