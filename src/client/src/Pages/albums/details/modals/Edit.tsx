import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  DatePicker,
  Form,
  Input,
  Loader,
  Select
} from '../../../../Components';
import { errorHandler } from '../../../../Handlers';
import { EditAlbumSchema } from '../../helpers';
import { Song } from '../../../songs/helpers';
import { EditAlbumProps } from './helpers';
import Api from '../../../../Api';
import moment from 'moment';

export default function Edit({ fetchAlbum, onClose }: EditAlbumProps) {
  const [defaultValues, setDefaultValues] = useState({});
  const [loading, setLoading] = useState<boolean>(true);

  const { id = '0' } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const { data: album } = await Api.albums.get({
          id,
          config: { params: { serializer: 'detailed' } }
        });

        const [{ data: artist }, { data: songs }] = await Promise.all([
          Api.artists.get({
            id: album.artist,
            config: { params: { serializer: 'list' } }
          }),
          Api.songs.fetch({
            config: {
              params: {
                serializer: 'list',
                uid__in: [...album.songs, ' ']
              }
            }
          })
        ]);

        setDefaultValues({
          ...album,
          type: [album.type],
          release_date: album?.release_date
            ? moment(album?.release_date).toDate()
            : null,
          artist: [artist],
          songs
        });
      } catch (error) {
        errorHandler(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const onSubmit = useCallback(
    async (data: any) => {
      try {
        const payload = {
          ...data,
          type: data.type[0],
          artist: data.artist[0].uid,
          songs: data.songs?.map((x: Partial<Song>) => x.uid)
        };
        const { data: updated } = await Api.albums.patch({
          id,
          body: payload
        });
        toast.success(
          `Successfully updated information about album: ${updated.name}`
        );
        await fetchAlbum();
        onClose();
      } catch (error) {
        console.log(error);
        const errors = errorHandler(error);
        toast.error(errors?.[0]?.message);
      }
    },
    [onClose, fetchAlbum, id]
  );

  if (loading) return <Loader size="sm" />;
  return (
    <Form
      validationSchema={EditAlbumSchema}
      defaultValues={defaultValues}
      header="Edit Album"
      onSubmit={onSubmit}
      onClose={onClose}
      schema={[
        {
          key: 'details',
          fields: [
            {
              key: 'name',
              label: 'Name',
              Component: Input,
              props: {
                type: 'text'
              },
              validations: {
                required: {
                  value: true,
                  message: 'Name is required.'
                }
              }
            },
            {
              key: 'type',
              label: 'Type',
              Component: Select,
              props: {
                fetchFn: () => Api.albums.fetchTypes({}),
                getOptionValue: (opt: { code: string }) => opt.code
              },
              validations: {
                required: {
                  value: true,
                  message: 'Type is required.'
                }
              }
            },
            {
              key: 'artist',
              label: 'Artist',
              Component: Select,
              props: {
                fetchFn: ({ params }: any) =>
                  Api.artists.fetch({ config: { params } })
              },
              validations: {
                required: {
                  value: true,
                  message: 'Artist is required.'
                }
              }
            },
            {
              key: 'release_date',
              label: 'Release Date',
              Component: DatePicker
            },
            {
              key: 'songs',
              label: 'Songs',
              Component: Select,
              props: {
                fetchFn: ({ params }: any) =>
                  Api.songs.fetch({ config: { params } }),
                multiple: true
              }
            }
          ]
        }
      ]}
    />
  );
}
