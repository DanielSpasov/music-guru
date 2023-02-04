import { Suspense, useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthContext } from '../Contexts/Auth';
import { PrivateRoute } from './helpers';
import { Loader } from '../Components';

// Pages
import CreateArtist from '../Pages/Artists/create';
import SignOut from '../Pages/Auth/SignOut';
import SignIn from '../Pages/Auth/SignIn';
import SignUp from '../Pages/Auth/SignUp';
import NotFound from '../Pages/NotFound';
import Artists from '../Pages/Artists';
import Home from '../Pages/Home';

export default function Router() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Suspense fallback={<Loader fullscreen rainbow />}>
      <Routes>
        {/* Index Route */}
        <Route index element={<Home />} />

        {/* Artist Routes */}
        <Route path="/artists">
          <Route index element={<Artists />} />
          <Route
            path="add"
            element={
              <PrivateRoute isAuth={isAuthenticated}>
                <CreateArtist />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Album Routes */}
        <Route path="/albums" element={<Home />} />

        {/* Mixtape Routes */}
        <Route path="/mixtapes" element={<Home />} />

        {/* Single Routes */}
        <Route path="/singles" element={<Home />} />

        {/* Auth Routes */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-out" element={<SignOut />} />

        {/* WildCard Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
