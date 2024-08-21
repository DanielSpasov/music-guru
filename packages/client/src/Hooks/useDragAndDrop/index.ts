import { DragEventHandler, useCallback, useState } from 'react';

const useDragAndDrop = (
  onDropFn: (files: FileList | null) => Promise<void> | void
) => {
  const [isDragging, setIsDragging] = useState(false);

  const onDragEnter: DragEventHandler = useCallback(e => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragOver: DragEventHandler = useCallback(e => {
    e.preventDefault();
  }, []);

  const onDragLeave: DragEventHandler = useCallback(e => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop: DragEventHandler = useCallback(
    async e => {
      e.preventDefault();
      await onDropFn(e.dataTransfer.files);
      setIsDragging(false);
    },
    [onDropFn]
  );

  return {
    isDragging,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop
  };
};

export default useDragAndDrop;
