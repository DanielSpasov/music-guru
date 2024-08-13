import { Model } from '../../Api/types';

export type Favorites = Partial<Record<Exclude<Model, 'users'>, string[]>>;
