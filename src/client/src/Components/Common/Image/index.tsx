import { ChangeEvent, FC, useCallback, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { ZodError } from 'zod';

import { hoverProps, imgProps, shapes } from './styles';
import { FileSchema } from '../../../Validations';
import { IPen, Loader } from '../../';
import { ImageProps } from './types';

const Image: FC<ImageProps> = ({
  src,
  alt = 'image',
  shape = 'square',
  editable = false,
  className,
  updateFn,
  ...props
}) => {
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
    <div className={`relative flex flex-shrink-0 ${className}`}>
      <img
        src={src}
        alt={alt}
        onClick={onImageClick}
        className={`${loading && 'opacity-60'} ${editable && hoverProps} ${
          shapes[shape]
        } ${imgProps}`}
        loading="lazy"
        data-testid="image"
        {...props}
      />

      {loading ? (
        <Loader className="absolute animate-spin opacity-100 pointer-events-none top-[calc(50%-1.2em)] left-[calc(50%-1.2em)] w-[2.4em] h-[2.4em]" />
      ) : (
        <IPen className="absolute opacity-0 pointer-events-none top-[calc(50%-1.2em)] left-[calc(50%-1.2em)] w-[2.4em] h-[2.4em]" />
      )}

      <input
        type="file"
        className="hidden"
        accept="image/jpeg, image/png"
        data-testid="image-input"
        ref={inputRef}
        onChange={onImageUpload}
      />
    </div>
  );
};

export default Image;
