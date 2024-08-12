export type Model = 'users' | 'artists' | 'songs' | 'albums' | 'album_types';
export type Serializer = 'detailed' | 'list';

export type ObjSerialzier<T extends Model> = Partial<
  Record<Serializer, (data: T) => any>
>;

export type QueryProps = {
  serializer?: Serializer;
  limit?: string;
  sort?: string;
} & Record<string, string>;
