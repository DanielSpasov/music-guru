import { ChangeEvent, FC, useCallback, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { ZodError } from 'zod';

import useDragAndDrop from '../../../Hooks/useDragAndDrop';
import { FileSchema } from '../../../Validations';
import { IUpload, Loader } from '../../';
import { ImageProps } from './types';

import css from './index.module.css';

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
    async (files: FileList | null, e?: ChangeEvent<HTMLInputElement>) => {
      try {
        setLoading(true);
        const file = files?.[0];
        if (!file || !updateFn || !editable) return;

        const validatedFile = FileSchema.parse(file);
        await updateFn(validatedFile);
        toast.success('Image updated successfully.');
      } catch (err) {
        if (err instanceof ZodError) toast.error(err.issues[0].message);
        if (e) e.target.value = '';
      } finally {
        setLoading(false);
      }
    },
    [updateFn, editable]
  );

  const { isDragging, onDragEnter, onDragLeave, onDragOver, onDrop } =
    useDragAndDrop(onImageUpload);

  const styles = useMemo(() => {
    const loadingStyles = loading ? css.loading : '';
    const dragStyles = editable && isDragging ? css.loading : '';
    const editableStyles = editable && !isDragging ? css.editable : '';

    return `${loadingStyles} ${dragStyles} ${editableStyles} ${css[shape]} ${className}`;
  }, [isDragging, loading, editable, shape, className]);

  return (
    <div className={css.wrapper}>
      <img
        src={src}
        alt={alt}
        onClick={onImageClick}
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={styles}
        data-testid="image"
        {...props}
      />

      {loading ? (
        <Loader type="spinner" className={css.loader} />
      ) : (
        <IUpload className={`${css.icon} ${!isDragging && css.editIcon}`} />
      )}

      <input
        type="file"
        className="hidden"
        accept="image/jpeg, image/png"
        data-testid="image-input"
        ref={inputRef}
        onChange={e => onImageUpload(e.target.files, e)}
      />
    </div>
  );
};

export default Image;
