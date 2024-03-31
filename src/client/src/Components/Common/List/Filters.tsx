import { ChangeEvent, KeyboardEvent, useCallback } from 'react';

import { FiltersProps } from './helpers';
import Icon from '../Icon';

const lightProps = 'border-neutral-300 border-[1px]';
const darkProps =
  'dark:border-none dark:shadow-md dark:shadow-neutral-900 dark:bg-neutral-900';
const themeProps = `${lightProps} ${darkProps}`;

const lightHoverProps = 'hover:bg-neutral-200';
const darkHoverProps = 'hover:dark:bg-neutral-800';
const hoverProps = `${lightHoverProps} ${darkHoverProps}`;

const lightIconProps = 'bg-primary';
const darkIconProps = 'dark:bg-primary-dark';
const iconProps = `${lightIconProps} ${darkIconProps}`;

export default function Filters({
  config = [],
  setFilters,
  onSubmit
}: FiltersProps) {
  const onFilterChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFilters(prev => ({
        ...prev,
        [e.target.name]: e.target.value || undefined
      }));
    },
    [setFilters]
  );

  const onEnterClick = useCallback(
    (key: KeyboardEvent<HTMLInputElement>) => {
      if (key.code !== 'Enter') return;
      onSubmit();
    },
    [onSubmit]
  );

  if (!config.length) return null;
  return (
    <div
      className={`flex items-center h-16 my-4 p-1 rounded-full ${themeProps}`}
    >
      {config.map(filter => (
        <div
          key={filter.key}
          className={`flex flex-col justify-center px-4 mr-2 rounded-full h-full ${hoverProps}`}
        >
          <p className="font-bold text-sm">{filter.label}</p>
          <input
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
        onClick={onSubmit}
      >
        <Icon model="search" />
      </div>
    </div>
  );
}
