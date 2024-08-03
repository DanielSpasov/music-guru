import { useNavigate, useParams } from 'react-router-dom';
import { FC, useCallback } from 'react';
import { toast } from 'react-toastify';

import { SubmitFn } from '../../../Components/Forms/Form/types';
import { EditArtistProps } from './types';
import Api from '../../../Api';
import {
  Fieldset,
  Form,
  Input,
  PageLayout,
  Textarea
} from '../../../Components';
import {
  ArtistSocialsSchema,
  EditArtistData,
  EditArtistSchema
} from '../../../Validations';

const EditArtist: FC<EditArtistProps> = ({ data }) => {
  const navigate = useNavigate();
  const { id = '0' } = useParams();

  const onSubmit: SubmitFn<EditArtistData> = useCallback(
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

        const { data } = await Api.artists.patch({ id, body: payload });
        toast.success('Successfully Edited Artist');
        navigate(`/artists/${data.uid}`);
      } catch (err) {
        toast.error('Failed to Edit Artist');
      }
    },
    [navigate, id]
  );

  return (
    <PageLayout title="Edit Artist" hideHeader>
      <Form
        onSubmit={onSubmit}
        validationSchema={EditArtistSchema}
        className="m-auto"
        header="Edit Artist"
        defaultValues={{
          ...data,
          ...data.links.reduce(
            (acc, { name, url }) => ({ ...acc, [name]: url }),
            {}
          )
        }}
      >
        <Fieldset title="Details" foldable>
          <Input label="Name" name="name" required />
          <Textarea label="About" name="about" />
        </Fieldset>

        <Fieldset title="Socials" foldable>
          <Input label="Instagram" name="intagram" />
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

export default EditArtist;
