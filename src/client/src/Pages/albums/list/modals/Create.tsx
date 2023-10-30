import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  DatePicker,
  Form,
  Input,
  Loader,
  Select
} from '../../../../Components';
import { errorHandler } from '../../../../Handlers';
import { Config } from '../../../../Api/helpers';
import { Song } from '../../../songs/helpers';
import { CreateAlbumProps } from './helpers';
import { AlbumSchema } from '../../helpers';
import Api from '../../../../Api';

export default function CreateAlbum({ onClose }: CreateAlbumProps) {
  const [defaultValues, setDefaultValues] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data: type } = await Api.albums.fetchTypes({
          config: { params: { code: 'A' } }
        });
        setDefaultValues({ type });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onSubmit = useCallback(
    async (body: any) => {
      try {
        const payload = {
          ...body,
          type: body?.type?.[0],
          artist: body?.artist?.[0]?.uid,
          songs: body?.songs?.map((x: Partial<Song>) => x?.uid)
        };
        const res = await Api.albums.post({
          body: payload,
          config: { headers: { 'Content-Type': 'multipart/form-data' } }
        });
        toast.success(`Successfully created album: ${res.name}`);
        onClose();
        navigate(`/albums/${res.uid}`);
      } catch (error) {
        const errors = errorHandler(error);
        toast.error(errors?.[0]?.message);
      }
    },
    [onClose, navigate]
  );

  if (loading) return <Loader size="sm" />;
  return (
    <Form
      validationSchema={AlbumSchema}
      defaultValues={defaultValues}
      header="Create Album"
      onSubmit={onSubmit}
      onClose={onClose}
      schema={[
        {
          key: 'details',
          title: 'Details',
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
              key: 'image',
              label: 'Image URL',
              Component: Input,
              props: {
                type: 'file',
                accept: ['image/jpeg', 'image/png']
              },
              validations: {
                required: {
                  value: true,
                  message: 'Image is required.'
                }
              }
            },
            {
              key: 'artist',
              label: 'Artist',
              Component: Select,
              props: {
                fetchFn: ({ params }: Config) =>
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
                fetchFn: ({ params }: Config) =>
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
