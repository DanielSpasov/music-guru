export const formatConut = (count: number) => {
  if (!count) return '0';
  if (count > 1_000_000) {
    return (count / 1_000_000).toFixed(1) + 'M';
  }
  if (count > 1_000) {
    return (count / 1_000).toFixed(1) + 'K';
  }
  return count.toString();
};
