import { FC, useCallback } from 'react';

import { Button, IPlus } from '../../../../../../../Components';
import { HeaderProps } from './types';

const Header: FC<HeaderProps> = ({ disableAdd, showAdd, setShowNewVerse }) => {
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
          <IPlus />
          <p>Add Verse</p>
        </Button>
      )}
    </div>
  );
};

export default Header;
