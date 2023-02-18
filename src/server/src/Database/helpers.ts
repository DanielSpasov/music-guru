export const defaultTransform = (_: any, data: any) => {
  delete data._id;
  delete data.__v;
  return data;
};
