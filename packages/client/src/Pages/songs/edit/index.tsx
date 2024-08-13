import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FC, useCallback } from 'react';
import moment from 'moment';

import { SubmitFn } from '../../../Components/Forms/Form/types';
import { EditSongProps } from './types';
import Api from '../../../Api';
import {
  Fieldset,
  Form,
  Input,
  Mask,
  PageLayout,
  Select,
  Textarea
} from '../../../Components';
import {
  EditSongData,
  EditSongSchema,
  SocialsSchema
} from '../../../Validations';

const EditSong: FC<EditSongProps> = ({ data }) => {
  const navigate = useNavigate();
  const { id = '0' } = useParams();

  const onSubmit: SubmitFn<EditSongData> = useCallback(
    async formData => {
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
          artist: formData.artist.uid,
          features: formData?.features?.map(x => x?.uid)
        };
        await Api.songs.patch({ id, body: payload });
        toast.success('Successfully Edited Song');
        navigate(`/songs/${id}`);
      } catch (err) {
        toast.error('Failed to Edit Song');
      }
    },
    [navigate, id]
  );

  return (
    <PageLayout title="Edit Song" hideHeader hideFooter>
      <Form
        onSubmit={onSubmit}
        validationSchema={EditSongSchema}
        className="m-auto"
        header="Edit Song"
        defaultValues={{
          ...data,
          release_date: data.release_date
            ? moment(data.release_date).format('MM/DD/yyyy')
            : '',
          ...data.links.reduce(
            (acc, { name, url }) => ({ ...acc, [name]: url }),
            {}
          )
        }}
      >
        <Fieldset title="Details" foldable>
          <Fieldset className="flex gap-2">
            <Input name="name" label="Name" required />
            <Mask name="release_date" label="Release Date" mask="99/99/9999" />
          </Fieldset>

          <Select
            name="artist"
            label="Artist"
            fetchFn={({ config }) => Api.artists.fetch({ config })}
            required
          />
          <Select
            name="features"
            label="Featured Artists"
            fetchFn={({ config }) => Api.artists.fetch({ config })}
            multiple
          />
          <Textarea name="about" label="About" />
        </Fieldset>

        <Fieldset title="Socials" foldable>
          <Input name="spotify" label="Spotify" />
          <Input name="apple_music" label="Apple Music" />
          <Input name="youtube" label="Youtube" />
          <Input name="soundcloud" label="Soundcloud" />
        </Fieldset>
      </Form>
    </PageLayout>
  );
};

export default EditSong;
