import { screen, render, fireEvent } from '@testing-library/react';

import { Theme, ThemeProvider } from '../../../../../../Contexts';
import { toggleCirlceStyles, toggleStyles } from './styles';
import DarkTheme from './';

const themes: Theme[] = ['dark', 'light'];

describe('DarkTheme', () => {
  beforeEach(() => localStorage.clear());

  test('renders without crashing', () => {
    render(<DarkTheme />);
    const element = screen.getByTestId('dark-theme-switch');
    expect(element).toBeInTheDocument();
  });

  test.each(themes)('renders correct prefered theme: %s', theme => {
    window.matchMedia = vi
      .fn()
      .mockImplementation(() => ({ matches: theme === 'dark' }));

    render(
      <ThemeProvider>
        <DarkTheme />
      </ThemeProvider>
    );

    const toggleEl = screen.getByTestId('dark-theme-toggle');

    expect(toggleEl).toHaveClass(toggleStyles[theme]);
    expect(toggleEl.firstElementChild).toHaveClass(toggleCirlceStyles[theme]);
  });

  test.each(themes)('renders opposite theme after toggle: %s', theme => {
    window.matchMedia = vi
      .fn()
      .mockImplementation(() => ({ matches: theme === 'dark' }));

    render(
      <ThemeProvider>
        <DarkTheme />
      </ThemeProvider>
    );

    const switchEl = screen.getByTestId('dark-theme-switch');
    const toggleEl = screen.getByTestId('dark-theme-toggle');

    fireEvent.click(switchEl);

    const opositeTheme = theme === 'dark' ? 'light' : 'dark';

    expect(toggleEl).toHaveClass(toggleStyles[opositeTheme]);
    expect(toggleEl.firstElementChild).toHaveClass(
      toggleCirlceStyles[opositeTheme]
    );

    expect(localStorage.getItem('theme')).toEqual(opositeTheme);
  });
});
