import { fireEvent, render, screen } from '@testing-library/react';

import { SocialsProps } from './types';
import Socials from '.';

describe('Socials', () => {
  const links: SocialsProps['links'] = [
    { name: 'apple_music', url: 'http://apple_music' },
    { name: 'soundcloud', url: 'http://soundcloud' },
    { name: 'instagram', url: 'http://instagram' },
    { name: 'facebook', url: 'http://facebook' },
    { name: 'spotify', url: 'http://spotify' },
    { name: 'youtube', url: 'http://youtube' },
    { name: 'x', url: 'http://x' }
  ];

  test('renders without crashing', () => {
    render(<Socials links={links} />);

    window.open = vi.fn();

    const socialsEl = screen.getByTestId('socials');
    expect(socialsEl).toBeInTheDocument();
    expect(socialsEl.children.length).toEqual(links.length);
  });

  test.each(links)('renders correct link: %s', link => {
    render(<Socials links={links} />);

    window.open = vi.fn();

    const socialEl = screen.getByTestId(`socials-${links.indexOf(link)}`);
    expect(socialEl).toBeInTheDocument();

    fireEvent.click(socialEl);

    const iconEl = screen.queryByTestId(`${link.name}-icon`);
    expect(iconEl).toBeInTheDocument();

    expect(window.open).toBeCalledWith(link.url, '_blank');
  });
});
