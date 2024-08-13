export type UseRecentlyViewed = () => {
  recentlyViewed: RecentItem[];
  addCurrent: () => void;
};

export type RecentItem = {
  to: string;
  name: string;
};
