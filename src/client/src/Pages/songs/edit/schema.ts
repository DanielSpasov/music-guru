import moment from 'moment';
import Api from '../../../Api';
import { DatePicker, Input, Select } from '../../../Components';
import { FormSchema } from '../../../Components/Forms/Form/helpers';
import { Artist } from '../../artists/helpers';
import { EditSongSchema } from '../helpers';

export const schema: FormSchema = {
  title: 'Edit Song',
  header: 'Edit Song',
  validationSchema: EditSongSchema,
  fetchDefaultData: async ({ toast, params: { id = '' } }) => {
    try {
      const { data: song } = await Api.songs.get({
        id,
        config: { params: { serializer: 'detailed' } }
      });

      const [{ data: artist }, { data: features }] = await Promise.all([
        Api.artists.get({
          id: song.artist,
          config: { params: { serializer: 'list' } }
        }),
        Api.artists.fetch({
          config: {
            params: {
              serializer: 'list',
              uid__in: [...song.features, ' ']
            }
          }
        })
      ]);

      return {
        ...song,
        release_date: song?.release_date
          ? moment(song?.release_date).toDate()
          : null,
        artist: [artist],
        features
      };
    } catch (err) {
      toast.error('Failed to fetch default data');
      return {};
    }
  },
  onSubmit: async ({ toast, formData, navigate, params: { id = '' } }) => {
    try {
      const payload = {
        ...formData,
        artist: formData.artist[0].uid,
        features: formData?.features?.map((x: Artist) => x?.uid)
      };
      const { data } = await Api.songs.patch({
        id,
        body: payload
      });
      toast.success('Successfully Edited Song');
      navigate(`/songs/${data.uid}`);
    } catch (err) {
      toast.error('Failed to Edit Song');
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
              message: 'Name is required.'
            }
          }
        },
        {
          key: 'features',
          label: 'Featured Artists',
          Component: Select,
          props: {
            multiple: true,
            fetchFn: ({ params }: any) =>
              Api.artists.fetch({ config: { params } })
          }
        }
      ]
    }
  ]
};
