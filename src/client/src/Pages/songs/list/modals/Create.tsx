import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCallback } from 'react';

import { DatePicker, Form, Input, Select } from '../../../../Components';
import { errorHandler } from '../../../../Handlers';
import { Artist } from '../../../artists/helpers';
import { CreateSongProps } from './helpers';
import { SongSchema } from '../../helpers';
import Api from '../../../../Api';

export default function CreateSong({ onClose }: CreateSongProps) {
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data: any) => {
      try {
        const payload = {
          ...data,
          artist: data.artist?.[0]?.uid,
          features: data?.features?.map((x: Partial<Artist>) => x.uid)
        };
        const res = await Api.songs.post({
          body: payload,
          config: { headers: { 'Content-Type': 'multipart/form-data' } }
        });
        toast.success(`Successfully created song: ${res.name}`);
        onClose();
        navigate(`/songs/${res.uid}`);
      } catch (error) {
        const errors = errorHandler(error);
        toast.error(errors?.[0]?.message);
      }
    },
    [onClose, navigate]
  );

  return (
    <Form
      header="Create Song"
      validationSchema={SongSchema}
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
              key: 'image',
              label: 'Image',
              Component: Input,
              props: {
                type: 'file',
                accept: ['image/jpeg', 'image/png']
              }
            },
            {
              key: 'release_date',
              label: 'Release Date',
              Component: DatePicker
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
              key: 'features',
              label: 'Featured Artists',
              Component: Select,
              props: {
                fetchFn: ({ params }: any) =>
                  Api.artists.fetch({ config: { params } }),
                multiple: true
              }
            }
          ]
        },
        {
          key: 'references',
          title: 'Referneces',
          fields: [
            {
              key: 'spotify',
              label: 'Spotify',
              Component: Input
            }
          ]
        }
      ]}
    />
  );
}
