import { FC, memo, useCallback, useContext } from 'react';

import { iconProps, toggleCirlceStyles, toggleStyles } from '../styles';
import { ThemeContext } from '../../../../../Contexts';
import { IMoon } from '../../../../Icons';

const DarkTheme: FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = useCallback(() => {
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark') {
      localStorage.setItem('theme', 'light');
      setTheme('light');
      return;
    }
    localStorage.setItem('theme', 'dark');
    setTheme('dark');
  }, [setTheme]);

  return (
    <div
      className={`flex justify-between items-center p-1 px-2 rounded-md cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800`}
      data-testid="dark-theme-switch"
      onClick={toggleTheme}
    >
      <div className="flex items-center gap-2">
        <IMoon className={`inline w-5 h-5 ${iconProps}`} />
        <span className="text-lg whitespace-nowrap mr-2">Dark Theme</span>
      </div>

      <div
        data-testid="dark-theme-toggle"
        className={`relative rounded-full w-11 h-6 ${toggleStyles[theme]}`}
      >
        <div
          className={`absolute top-1 w-4 h-4 rounded-full bg-white ${toggleCirlceStyles[theme]}`}
        />
      </div>
    </div>
  );
};

export default memo(DarkTheme);
