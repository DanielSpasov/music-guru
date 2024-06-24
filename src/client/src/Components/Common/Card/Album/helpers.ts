export const lightProps = 'bg-neutral-200';
export const darkProps = 'dark:bg-neutral-900';
const themeProps = `${lightProps} ${darkProps}`;

export const lightHoverProps = 'hover:shadow-neutral-400';
export const darkHoverProps = 'dark:hover:shadow-neutral-900';
const hoverProps = `${lightHoverProps} ${darkHoverProps}`;

export const lightHoverTextProps =
  '[&>div:nth-child(2)>span:nth-child(1)]:hover:text-primary';
export const darkHoverTextProps =
  'dark:[&>div:nth-child(2)>span:nth-child(1)]:hover:text-primary-dark';
const hoverTextProps = `${lightHoverTextProps} ${darkHoverTextProps}`;

export const defaultProps = `${themeProps} ${hoverProps} ${hoverTextProps}`;
