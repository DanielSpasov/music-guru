import { useCallback } from 'react';

import { Button, Icon } from '../../../../Components';
import { HeaderProps } from './helpers';

export default function Header({
  disableAdd,
  showAdd,
  setShowNewVerse
}: HeaderProps) {
  const handleAddVerseClick = useCallback(() => {
    setShowNewVerse(true);
    requestAnimationFrame(() => {
      const form = document.querySelector('form');
      form?.scrollIntoView({ behavior: 'smooth' });
    });
  }, [setShowNewVerse]);

  return (
    <div className="flex items-center justify-between">
      <h2>Lyrics</h2>

      {showAdd && (
        <Button
          onClick={handleAddVerseClick}
          disabled={disableAdd}
          variant="outline"
        >
          <Icon model="add" />
          <p>Add Verse</p>
        </Button>
      )}
    </div>
  );
}
