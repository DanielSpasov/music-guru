import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCallback } from 'react';

import { Form, Input, Select } from '../../../../Components';
import { errorHandler } from '../../../../Handlers';
import { Song } from '../../../songs/helpers';
import { CreateAlbumProps } from './helpers';
import { AlbumSchema } from '../../helpers';
import Api from '../../../../Api';

export default function CreateAlbum({ onClose }: CreateAlbumProps) {
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (body: any) => {
      try {
        const payload = {
          ...body,
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

  return (
    <Form
      validationSchema={AlbumSchema}
      header="Create Album"
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
