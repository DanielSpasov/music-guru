import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { AuthContext } from '../../../Contexts';
import { User } from '../../../Types/User';
import Navbar from '.';

describe('Navbar', () => {
  test('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const element = screen.getByTestId('navbar');
    expect(element).toBeInTheDocument();
  });

  test('renders correct user data & links in user menu', () => {
    const data: User = {
      created_at: 'today',
      email: 'test@email.com',
      favorites: {},
      uid: 'test-uid',
      username: 'Test Username',
      verified: true
    };

    render(
      <MemoryRouter>
        <AuthContext.Provider
          value={{
            data,
            uid: data.uid,
            isAuthenticated: true,
            dispatch: () => null
          }}
        >
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    const userMenuEl = screen.getByTestId('navbar-user-menu-icon');
    fireEvent.click(userMenuEl);

    const usernameEl = screen.getByTestId('navbar-user-menu-username');
    expect(usernameEl).toBeInTheDocument();
    expect(usernameEl.firstChild?.textContent).toEqual(data.username);

    const emailEl = screen.getByTestId('navbar-user-menu-email');
    expect(emailEl).toBeInTheDocument();
    expect(emailEl.textContent).toEqual(data.email);

    const settingsEl = screen.queryByTestId('navbar-user-menu-settings');
    expect(settingsEl).toBeInTheDocument();

    const signOutEl = screen.queryByTestId('navbar-user-menu-sign-out');
    expect(signOutEl).toBeInTheDocument();

    const signInEl = screen.queryByTestId('navbar-user-menu-sign-in');
    expect(signInEl).not.toBeInTheDocument();

    const signUpEl = screen.queryByTestId('navbar-user-menu-sign-up');
    expect(signUpEl).not.toBeInTheDocument();
  });

  test('renders correct links for users that signed out', () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider
          value={{
            data: null,
            uid: null,
            isAuthenticated: false,
            dispatch: () => null
          }}
        >
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    const userMenuEl = screen.getByTestId('navbar-user-menu-icon');
    fireEvent.click(userMenuEl);

    const usernameEl = screen.queryByTestId('navbar-user-menu-username');
    expect(usernameEl).not.toBeInTheDocument();

    const emailEl = screen.queryByTestId('navbar-user-menu-email');
    expect(emailEl).not.toBeInTheDocument();

    const settingsEl = screen.queryByTestId('navbar-user-menu-settings');
    expect(settingsEl).not.toBeInTheDocument();

    const signOutEl = screen.queryByTestId('navbar-user-menu-sign-out');
    expect(signOutEl).not.toBeInTheDocument();

    const signInEl = screen.queryByTestId('navbar-user-menu-sign-in');
    expect(signInEl).toBeInTheDocument();

    const signUpEl = screen.queryByTestId('navbar-user-menu-sign-up');
    expect(signUpEl).toBeInTheDocument();
  });
});
