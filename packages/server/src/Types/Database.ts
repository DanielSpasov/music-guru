export type Model = 'users' | 'artists' | 'songs' | 'albums' | 'album_types';
export type Serializer = 'detailed' | 'list';

export type QueryProps = {
  serializer?: Serializer;
  limit?: string;
  sort?: string;
  page?: string;
} & Record<string, string>;
