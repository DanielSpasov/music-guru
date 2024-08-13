import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCallback } from 'react';

import { SubmitFn } from '../../../Components/Forms/Form/types';
import Api from '../../../Api';
import {
  ArtistSocialsSchema,
  CreateArtistSchema,
  CreateArtistData
} from '../../../Validations';
import {
  Fieldset,
  File,
  Form,
  Input,
  PageLayout,
  Textarea
} from '../../../Components';

const CreateArtist = () => {
  const navigate = useNavigate();

  const onSubmit: SubmitFn<CreateArtistData> = useCallback(
    async formData => {
      try {
        const socialsKeys = Object.keys(ArtistSocialsSchema.shape);
        const payload = Object.entries(formData).reduce(
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
        Object.keys(payload).forEach(
          key => payload[key] === undefined && delete payload[key]
        );

        const { data } = await Api.artists.post({
          body: payload,
          config: { headers: { 'Content-Type': 'multipart/form-data' } }
        });
        toast.success('Successfully Created Artist');
        navigate(`/artists/${data.uid}`);
      } catch (err) {
        toast.error('Failed to Create Artist');
      }
    },
    [navigate]
  );

  return (
    <PageLayout title="Create Artist" hideHeader>
      <Form
        onSubmit={onSubmit}
        header="New Artist"
        validationSchema={CreateArtistSchema}
        className="m-auto"
      >
        <Fieldset title="Details" foldable>
          <Input label="Name" name="name" required />
          <File
            label="Image"
            name="image"
            accept="image/jpeg, image/png"
            required
          />
          <Textarea label="About" name="about" />
        </Fieldset>

        <Fieldset title="Socials" foldable>
          <Input label="Instagram" name="instagram" />
          <Input label="X" name="x" />
          <Input label="Facebook" name="facebook" />
          <Input label="Spotify" name="spotify" />
          <Input label="Apple Music" name="apple_music" />
          <Input label="Youtube" name="youtube" />
          <Input label="Soundcloud" name="soundcloud" />
        </Fieldset>
      </Form>
    </PageLayout>
  );
};

export default CreateArtist;
