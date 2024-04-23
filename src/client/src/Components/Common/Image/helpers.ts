export type ImageProps = {
  src: string;
  alt?: string;
  size?: number;
  editable?: boolean;
  className?: string;
  updateFn?: (file: File) => Promise<void>;
};
