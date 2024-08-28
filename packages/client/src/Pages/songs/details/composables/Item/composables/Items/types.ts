import { Model } from '../../../../../../../Api/types';

export type ItemType = 'link' | 'links' | 'date' | 'text';

export type LinkProps<T> = {
  value: T;
  type: Extract<ItemType, 'link'>;
  linkType?: Model;
  missingText?: string;
};

export type LinksProps<T> = {
  value: T[];
  type: Extract<ItemType, 'links'>;
  linkType?: Model;
  missingText?: string;
};

export type DateProps = {
  value: Date | null;
  type: Extract<ItemType, 'date'>;
  missingText?: string;
};

export type TextProps = {
  value: string;
  type: Extract<ItemType, 'text'>;
  missingText?: string;
};
