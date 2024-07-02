import { Config } from '../../../../Api/helpers';
import { Filter } from '../helpers';

export type FiltersProps = {
  config: Filter[];
  onApplyFilters: (config: Config) => Promise<void>;
};

const lightProps = 'border-neutral-300 border-[1px]';
const darkProps =
  'dark:border-none dark:shadow-md dark:shadow-neutral-900 dark:bg-neutral-900';
export const themeProps = `${lightProps} ${darkProps}`;

const lightHoverProps = 'hover:bg-neutral-200';
const darkHoverProps = 'hover:dark:bg-neutral-800';
export const hoverProps = `${lightHoverProps} ${darkHoverProps}`;

const lightIconProps = 'bg-primary';
const darkIconProps = 'dark:bg-primary-dark';
export const iconProps = `${lightIconProps} ${darkIconProps}`;
