import { lazy } from 'react';

export const Components = {
  Home: lazy(() => import('../Pages/home')),
  ArtistsList: lazy(() => import('../Pages/artists/list')),
  ArtistsCreate: lazy(() => import('../Pages/artists/create')),
  ArtistsDetails: lazy(() => import('../Pages/artists/details')),
  ArtistsEdit: lazy(() => import('../Pages/artists/edit')),
  AlbumsList: lazy(() => import('../Pages/albums/list')),
  AlbumsCreate: lazy(() => import('../Pages/albums/create')),
  AlbumsDetails: lazy(() => import('../Pages/albums/details')),
  AlbumsEdit: lazy(() => import('../Pages/albums/edit')),
  SongsList: lazy(() => import('../Pages/songs/list')),
  SongsCreate: lazy(() => import('../Pages/songs/create')),
  SongsDetails: lazy(() => import('../Pages/songs/details')),
  SongsEdit: lazy(() => import('../Pages/songs/edit')),
  SongSettings: lazy(() => import('../Pages/songs/settings')),
  SettingsAccount: lazy(() => import('../Pages/settings/account')),
  SettingsPassword: lazy(() => import('../Pages/settings/password')),
  SettingsMFA: lazy(() => import('../Pages/settings/mfa')),
  SignIn: lazy(() => import('../Pages/auth/sign-in')),
  SignUp: lazy(() => import('../Pages/auth/sign-up')),
  SignOut: lazy(() => import('../Pages/auth/sign-out')),
  VerifyEmail: lazy(() => import('../Pages/auth/verify-email')),
  AccessDenied: lazy(() => import('../Pages/access-denied')),
  NotFound: lazy(() => import('../Pages/not-found'))
};
