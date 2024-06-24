import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { ZodError } from 'zod';

import { FileSchema } from '../../../Validations';
import { ImageProps } from './helpers';
import { IPen, ISpinner } from '../..';

export const lightImgProps = 'shadow-neutral-400';
export const darkImgProps = 'dark:shadow-neutral-900';
export const imgProps = `shadow-lg rounded-full ${lightImgProps} ${darkImgProps}`;

export const hoverProps =
  'cursor-pointer [&+svg]:hover:opacity-100 hover:opacity-60';

export default function Image({
  src,
  alt = 'image',
  editable = false,
  className = '',
  size = 64,
  updateFn
}: ImageProps) {
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const onImageClick = useCallback(() => {
    if (!editable || loading || !inputRef.current) return;
    inputRef.current.click();
  }, [editable, loading]);

  const onImageUpload = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      try {
        setLoading(true);
        const input = e.target as HTMLInputElement;
        const file = input.files?.[0];
        if (!file || !updateFn || !editable) return;

        const validatedFile = FileSchema.parse(file);
        await updateFn(validatedFile);
        toast.success('Image updated successfully.');
      } catch (err) {
        if (err instanceof ZodError) toast.error(err.issues[0].message);
        e.target.value = '';
      } finally {
        setLoading(false);
      }
    },
    [updateFn, editable]
  );

  return (
    <div className={`relative flex flex-shrink-0 w-${size} h-${size}`}>
      <img
        src={src}
        alt={alt}
        onClick={onImageClick}
        className={`w-full ${loading ? 'opacity-60' : ''} ${
          editable ? hoverProps : ''
        } ${imgProps} ${className}`}
        loading="lazy"
        data-testid="image"
      />

      {loading ? (
        <ISpinner className="absolute animate-spin opacity-100 pointer-events-none top-[calc(50%-1.2em)] left-[calc(50%-1.2em)] w-[2.4em] h-[2.4em]" />
      ) : (
        <IPen className="absolute opacity-0 pointer-events-none top-[calc(50%-1.2em)] left-[calc(50%-1.2em)] w-[2.4em] h-[2.4em]" />
      )}

      <input
        type="file"
        className="hidden"
        accept="image/jpeg, image/png"
        ref={inputRef}
        data-testid="image-input"
        onChange={onImageUpload}
      />
    </div>
  );
}
