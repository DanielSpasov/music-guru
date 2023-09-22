import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Artist } from '../Pages/artists/helpers';
import { errorHandler } from '../Handlers';
import Api from '../Api';

const defaultArtist: Artist = {
  uid: '',
  name: '',
  image: '',
  created_by: { uid: '' },
  created_at: new Date(),
  features: [],
  albums: [],
  songs: []
};

export default function useArtist({ id = '0' }: { id?: string }) {
  const [artist, setArtist] = useState<Artist>(defaultArtist);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const fetchArtist = useCallback(async () => {
    try {
      const { data } = await Api.artists.get({
        id,
        config: { params: { serializer: 'detailed' } }
      });
      setArtist(data);
    } catch (error) {
      errorHandler(error, navigate);
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    (async () => await fetchArtist())();
  }, [fetchArtist]);

  const updateField = useCallback(
    async (key: keyof Artist) => {
      const field = document.getElementById(key) as HTMLInputElement;
      if (field.value === artist[key]) return;
      await Api.artists.patch({ id, body: { [key]: field.value } });
      await fetchArtist();
    },
    [id, artist, fetchArtist]
  );

  return {
    artist,
    setArtist,
    loading,
    isEditing,
    setIsEditing,
    updateField
  };
}
