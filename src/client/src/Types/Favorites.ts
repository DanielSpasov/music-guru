import { ModelKeys } from '../Api/helpers';

export type Favorites = Partial<Record<Exclude<ModelKeys, 'users'>, string[]>>;
