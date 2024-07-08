import { Model } from '../../../../../Api/types';

export type ItemType = 'link' | 'links' | 'date' | 'text';

export type BaseItem = { uid: string; name: string };

export type LinkProps<T> = {
  value: T;
  type: Extract<ItemType, 'link'>;
  linkType?: Model;
};

export type LinksProps<T> = {
  value: T[];
  type: Extract<ItemType, 'links'>;
  linkType?: Model;
};

export type DateProps = {
  value: Date | null;
  type: Extract<ItemType, 'date'>;
};

export type TextProps = {
  value: string;
  type: Extract<ItemType, 'text'>;
};

export type ItemComponentProps<T> =
  | LinkProps<T>
  | LinksProps<T>
  | DateProps
  | TextProps;

export type ItemProps<T> = {
  label: string;
} & ItemComponentProps<T>;

export type MissingTextProps = {
  message?: string;
};
