import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';

import { Home, NotFound, SignUp, SignIn, SignOut } from './Pages';
import { AuthContext } from './Contexts/Auth';

export default function Router() {
  return (
    <Routes>
      <Route index element={<Home />} />

      {/* Artist Routes */}
      <Route path="/artists" element={<Private route={<Home />} />} />

      {/* Album Routes */}
      <Route path="/albums" element={<Home />} />

      {/* Mixtape Routes */}
      <Route path="/mixtapes" element={<Home />} />

      {/* Single Routes */}
      <Route path="/singles" element={<Home />} />

      {/* Authentication Related Routes */}
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-out" element={<SignOut />} />

      {/* Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function Private({ route }: { route: JSX.Element }) {
  const { auth } = useContext(AuthContext);
  if (!auth.isAuthenticated) return <Navigate to="/sign-in" />;
  return route;
}
