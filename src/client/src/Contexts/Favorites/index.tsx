import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
  Dispatch,
  SetStateAction
} from 'react';

import { ModelKeys } from '../../Api/helpers';
import { AuthContext } from '../Auth';
import Api from '../../Api';

export type Favorites = Partial<Record<Exclude<ModelKeys, 'user'>, string[]>>;

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
      const { data } = await Api.user.get({ id: uid });
      setFavorites(data?.favorites || {});
    })();
  }, [isAuthenticated, uid]);

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}
