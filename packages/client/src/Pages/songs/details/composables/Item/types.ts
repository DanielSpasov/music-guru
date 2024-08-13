import {
  DateProps,
  LinkProps,
  LinksProps,
  TextProps
} from './composables/Items/types';

export type ItemProps<T> = {
  label: string;
} & (LinkProps<T> | LinksProps<T> | DateProps | TextProps);
