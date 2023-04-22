const regex = /^(?!\.*$)[\w. ]+$/;

export const getSearchQuery = (query?: string) => {
  // Search not intended
  if (!query) return {};

  const queryString = query?.toString() || '';
  const search = regex.exec(queryString);

  // Search not supposed to be finding anything
  if (!search) return null;
  return { name: { $regex: search[0], $options: 'i' } };
};
