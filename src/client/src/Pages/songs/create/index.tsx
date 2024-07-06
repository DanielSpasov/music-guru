import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCallback } from 'react';

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
import { SocialsSchema, CreateSongSchema } from '../../../Validations';
import { ListArtist } from '../../../Types/Artist';
import Api from '../../../Api';

export default function CreateSong() {
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (formData: any) => {
      try {
        const socialsKeys = Object.keys(SocialsSchema.shape);

        const socialsPayload = {
          links: [],
          ...formData
        };
        Object.entries(formData).forEach(([key, value]) => {
          if (!value) return;
          if (socialsKeys.includes(key)) {
            socialsPayload.links.push({ name: key, url: value });
            delete socialsPayload[key];
          }
        });

        Object.keys(socialsPayload).forEach(
          key => socialsPayload[key] === undefined && delete socialsPayload[key]
        );

        const payload = {
          ...socialsPayload,
          artist: formData.artist?.uid,
          features: formData?.features?.map((x: ListArtist) => x.uid)
        };

        const res = await Api.songs.post({
          body: payload,
          config: { headers: { 'Content-Type': 'multipart/form-data' } }
        });
        toast.success('Successfully Created Song');
        navigate(`/songs/${res.uid}`);
      } catch (error) {
        toast.success('Failed to Created Song');
      }
    },
    [navigate]
  );

  return (
    <PageLayout title="Create Song" hideHeader>
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

        <Fieldset title="Socials" foldable>
          <Input name="spotify" label="Spotify" />
          <Input name="apple_music" label="Apple Music" />
          <Input name="youtube" label="Youtube" />
          <Input name="soundcloud" label="Soundcloud" />
        </Fieldset>
      </Form>
    </PageLayout>
  );
}
