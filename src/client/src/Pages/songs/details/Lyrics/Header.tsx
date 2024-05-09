import { useMemo, useCallback } from 'react';

import { Icon } from '../../../../Components';
import { HeaderProps } from './helpers';

const lightButtonProps = 'bg-transparent border-primary [&>p]:text-primary';
const darkButtonProps =
  'dark:border-neutral-900 dark:bg-transparent dark:shadow-md [&>p]:dark:text-white';
const themeButtonProps = `border-2 ${lightButtonProps} ${darkButtonProps}`;

const lightHoverButtonProps =
  'hover:bg-primary [&>p]:hover:text-white [&>svg>path]:hover:fill-white';
const darkHoverButtonProps = 'hover:dark:bg-neutral-900';
const hoverButtonProps = `hover:opacity-100 ${lightHoverButtonProps} ${darkHoverButtonProps}`;

export default function Header({
  disableAdd,
  showAdd,
  setShowNewVerse
}: HeaderProps) {
  const buttonClassNames = useMemo(() => {
    return `flex items-center rounded-full py-1 px-3 ${themeButtonProps} ${
      !disableAdd ? hoverButtonProps : ''
    }`;
  }, [disableAdd]);

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
        <button
          className={buttonClassNames}
          onClick={handleAddVerseClick}
          disabled={disableAdd}
        >
          <Icon model="add" />
          <p>Add Verse</p>
        </button>
      )}
    </div>
  );
}
