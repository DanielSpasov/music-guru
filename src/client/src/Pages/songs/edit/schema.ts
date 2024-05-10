import moment from 'moment';

import { FormSchema } from '../../../Components/Forms/Form/helpers';
import { Calendar, Input, Select } from '../../../Components';
import { EditSongSchema } from '../../../Validations/Song';
import { SocialsSchema } from '../../../Validations';
import { Artist } from '../../../Types/Artist';
import Api from '../../../Api';

export const schema: FormSchema = {
  title: 'Edit Song',
  header: 'Edit Song',
  validationSchema: EditSongSchema,
  fetchDefaultData: async ({ toast, params: { id = '' } }) => {
    try {
      const { data } = await Api.songs.get({
        id,
        config: { params: { serializer: 'detailed' } }
      });

      return {
        ...data,
        release_date: data?.release_date
          ? moment(data?.release_date).toDate()
          : null,
        artist: [data.artist],
        ...data.links.reduce(
          (acc, { name, url }) => ({ ...acc, [name]: url }),
          {}
        )
      };
    } catch (err) {
      toast.error('Failed to fetch default data');
      return {};
    }
  },
  onSubmit: async ({ toast, formData, navigate, params: { id = '' } }) => {
    try {
      const socialsKeys = Object.keys(SocialsSchema.shape);

      const socialsPayload = Object.entries(formData).reduce(
        (data, [key, value]) => {
          if (!value) return data;

          if (socialsKeys.includes(key)) {
            return {
              ...data,
              links: [...(data?.links || []), { name: key, url: value }]
            };
          }
          return { ...data, [key]: value };
        },
        formData
      );

      Object.keys(socialsPayload).forEach(
        key => socialsPayload[key] === undefined && delete socialsPayload[key]
      );

      const payload = {
        ...socialsPayload,
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
          Component: Calendar
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
    },
    {
      key: 'socials',
      title: 'Socials',
      fields: [
        {
          key: 'spotify',
          label: 'Spotify',
          Component: Input
        },
        {
          key: 'apple_music',
          label: 'Apple Music',
          Component: Input
        },
        {
          key: 'youtube',
          label: 'Youtube',
          Component: Input
        },
        {
          key: 'soundcloud',
          label: 'Soundcloud',
          Component: Input
        }
      ]
    }
  ]
};
