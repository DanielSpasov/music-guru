import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCallback } from 'react';
import moment from 'moment';

import { SubmitFn } from '../../../Components/Forms/Form/types';
import Api from '../../../Api';
import {
  Fieldset,
  File,
  Form,
  Input,
  PageLayout,
  Select,
  Textarea,
  Mask
} from '../../../Components';
import {
  SocialsSchema,
  CreateSongSchema,
  CreateSongData
} from '../../../Validations';

const CreateSong = () => {
  const navigate = useNavigate();

  const onSubmit: SubmitFn<CreateSongData> = useCallback(
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
          release_date: formData?.release_date
            ? moment(formData.release_date, 'DD/MM/yyyy').toDate()
            : null,
          artist: formData.artist?.uid,
          features: formData?.features?.map(x => x?.uid)
        };

        const { data } = await Api.songs.post({
          body: payload,
          config: { headers: { 'Content-Type': 'multipart/form-data' } }
        });
        toast.success('Successfully Created Song');
        navigate(`/songs/${data.uid}`);
      } catch (error) {
        toast.error('Failed to Created Song');
      }
    },
    [navigate]
  );

  return (
    <PageLayout title="Create Song" hideHeader hideFooter>
      <Form
        onSubmit={onSubmit}
        validationSchema={CreateSongSchema}
        header="New Song"
        className="m-auto"
      >
        <Fieldset title="Details" foldable>
          <Fieldset className="flex gap-2">
            <Input name="name" label="Name" required />
            <File name="image" label="Image" accept="image/jpeg, image/png" />
          </Fieldset>

          <Mask name="release_date" label="Release Date" mask="99/99/9999" />
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

        <Fieldset title="Links" foldable>
          <Input name="spotify" label="Spotify" />
          <Input name="apple_music" label="Apple Music" />
          <Input name="youtube" label="Youtube" />
          <Input name="soundcloud" label="Soundcloud" />
        </Fieldset>
      </Form>
    </PageLayout>
  );
};

export default CreateSong;
