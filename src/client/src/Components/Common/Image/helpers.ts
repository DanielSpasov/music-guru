export type ImageProps = {
  src: string;
  alt?: string;
  size?: number;
  editable?: boolean;
  className?: string;
  updateFn?: (file: File) => Promise<void>;
};

export const lightImgProps = 'shadow-neutral-400';
export const darkImgProps = 'dark:shadow-neutral-900';
export const imgProps = `shadow-lg rounded-full ${lightImgProps} ${darkImgProps}`;

export const hoverProps =
  'cursor-pointer [&+svg]:hover:opacity-100 hover:opacity-60';
