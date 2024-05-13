import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
  Dispatch,
  SetStateAction
} from 'react';

import { Favorites } from '../../Types/Favorites';
import { AuthContext } from '../Auth';
import Api from '../../Api';

interface FavoritesContextType {
  favorites: Favorites;
  setFavorites: Dispatch<SetStateAction<Favorites>>;
}

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: {},
  setFavorites: () => null
});

type FavoritesProviderProps = {
  children: ReactNode;
};

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const { uid, isAuthenticated } = useContext(AuthContext);

  const [favorites, setFavorites] = useState<Favorites>({});

  useEffect(() => {
    (async () => {
      if (!isAuthenticated || !uid) return;
      const { data } = await Api.users.get({ id: uid });
      setFavorites(data?.favorites || {});
    })();
  }, [isAuthenticated, uid]);

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}
