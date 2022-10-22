import { Routes, Route } from 'react-router-dom';

import { Home, NotFound, SignUp, SignIn, SignOut } from './Pages';

export default function Router() {
  return (
    <Routes>
      {/* Home */}
      <Route index element={Home()} />

      {/* Artist Routes */}
      <Route path="/artists" element={Home()} />

      {/* Album Routes */}
      <Route path="/albums" element={Home()} />

      {/* Mixtape Routes */}
      <Route path="/mixtapes" element={Home()} />

      {/* Single Routes */}
      <Route path="/singles" element={Home()} />

      {/* Authentication Related Routes */}
      <Route path="/sign-in" element={SignIn()} />
      <Route path="/sign-up" element={SignUp()} />
      <Route path="/sign-out" element={SignOut()} />

      {/* Not Found */}
      <Route path="*" element={NotFound()} />
    </Routes>
  );
}
