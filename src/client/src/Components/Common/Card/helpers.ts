import { Favorites } from '../../../Types/Favorites';
import { ModelKeys } from '../../../Api/helpers';

export interface CardProps<T> {
  data: T;
  loading?: boolean;
  onClick?: (props: any) => any;
}

export interface CardSwitchProps extends CardProps<any> {
  model: Exclude<ModelKeys, 'user'>;
  favoriteFn?: (uid: string) => Promise<{ favorites: Favorites }>;
}

const lightIconProps = '[&>path]:fill-primary';
const darkIconProps = 'dark:[&>path]:fill-primary-dark';
const iconProps = `[&>path]:opacity-100 ${lightIconProps} ${darkIconProps}`;

const iconHoverProps = `[&>path]:hover:opacity-70`;
export const themeProps = `${iconProps} ${iconHoverProps}`;

const lightLoadingProps = '[&>path]:fill-primary';
const darkLoadingProps = 'dark:[&>path]:fill-primary-dark';
export const loadingProps = `animate-spin ${lightLoadingProps} ${darkLoadingProps}`;
