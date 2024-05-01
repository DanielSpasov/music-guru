import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { defaultArtist } from '../Pages/artists/details';
import { Song } from '../Pages/songs/helpers';
import { errorHandler } from '../Handlers';
import Api from '../Api';

const defaultSong: Song = {
  uid: '',
  created_at: new Date(),
  created_by: '',
  features: [],
  image: '',
  name: '',
  release_date: undefined,
  artist: defaultArtist,
  verses: []
};

export default function useSong(uid: string) {
  const [song, setSong] = useState<Song>(defaultSong);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await Api.songs.get({
          id: uid,
          config: { params: { serializer: 'detailed' } }
        });
        setSong(data);
      } catch (error) {
        errorHandler(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [uid]);

  const del = useCallback(async () => {
    try {
      setLoading(true);
      await Api.songs.del({ id: song.uid });
      navigate('/songs');
      toast.success('Song deleted sucessfully');
    } catch (error) {
      toast.error('Failed to delete Song');
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  }, [song, navigate]);

  const addVerse = useCallback<SubmitHandler<any>>(
    async formValues => {
      try {
        const { data } = await Api.songs.addVerse({ uid, payload: formValues });
        setSong(prev => ({ ...prev, verses: [...prev.verses, data] }));
        toast.success('Verse added sucessfully');
      } catch (err) {
        toast.error('Failed to add Verse');
      }
    },
    [uid]
  );

  const updateImage = useCallback(
    async (file: File) => {
      try {
        const { image } = await Api.songs.updateImage({
          uid: song.uid,
          image: file,
          config: { headers: { 'Content-Type': 'multipart/form-data' } }
        });
        setSong(prev => ({ ...prev, image }));
      } catch (err) {
        toast.error('Failed to update image');
      }
    },
    [song.uid]
  );

  return {
    song,
    loading,
    del,
    updateImage,
    addVerse
  };
}
