import { useLocation } from 'react-router-dom';
import { useCallback } from 'react';

import { RecentItem, UseRecentlyViewed } from './helpers';

const useRecentlyViewed: UseRecentlyViewed = () => {
  const { pathname } = useLocation();

  const addCurrent = useCallback(() => {
    const recent = localStorage.getItem('recently_viewed') || '[]';
    const recently_viewed: RecentItem[] = JSON.parse(recent);

    if (recently_viewed.find(x => x.to === pathname)) return;

    if (recently_viewed.length === 10) recently_viewed.pop();
    recently_viewed.unshift({ to: pathname, name: document.title });
    localStorage.setItem('recently_viewed', JSON.stringify(recently_viewed));
  }, [pathname]);

  return {
    recentlyViewed: JSON.parse(localStorage.getItem('recently_viewed') || '[]'),
    addCurrent
  };
};

export default useRecentlyViewed;
