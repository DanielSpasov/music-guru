const regex = /^(?!\.*$)[\w. ]+$/;

export const getSearchQuery = (query: any) => {
  if (!query) return;

  const queryString = query?.toString() || '';
  const search = regex.exec(queryString);
  return !search ? '' : search[0];
};

export const getMongoSearchQuery = (query: any) => {
  // Search not intended
  if (!query) return {};

  const queryString = query?.toString() || '';
  const search = regex.exec(queryString);

  // Search not supposed to be finding anything
  if (!search) return null;
  return { name: { $regex: search[0], $options: 'i' } };
};
