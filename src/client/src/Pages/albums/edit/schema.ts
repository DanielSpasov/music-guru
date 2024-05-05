import moment from 'moment';

import { FormSchema } from '../../../Components/Forms/Form/helpers';
import { Calendar, Input, Select } from '../../../Components';
import { EditAlbumSchema } from '../../../Validations/Album';
import { Song } from '../../../Types/Song';
import Api from '../../../Api';

export const schema: FormSchema = {
  title: 'Edit Album',
  header: 'Edit Album',
  validationSchema: EditAlbumSchema,
  fetchDefaultData: async ({ toast, params: { id = '' } }) => {
    try {
      const { data: album } = await Api.albums.get({
        id,
        config: { params: { serializer: 'detailed' } }
      });

      return {
        ...album,
        type: [album.type],
        release_date: album?.release_date
          ? moment(album?.release_date).toDate()
          : null,
        artist: [album.artist],
        songs: album.songs
      };
    } catch (err) {
      toast.error('Failed to fetch default data');
      return {};
    }
  },
  onSubmit: async ({ formData, toast, navigate, params: { id = '' } }) => {
    try {
      const payload = {
        ...formData,
        type: formData.type[0],
        artist: formData.artist[0].uid,
        songs: formData.songs?.map((x: Song) => x.uid)
      };
      await Api.albums.patch({
        id,
        body: payload
      });
      toast.success('Successfully Edited Album');
      navigate(`/albums/${id}`);
    } catch (err) {
      toast.error('Failed to Edit Album');
    }
  },
  sections: [
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
          Component: Calendar
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
  ]
};
