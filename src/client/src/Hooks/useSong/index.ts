import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { SubmitFn } from '../../Components/Forms/Form/types';
import { Song, Verse, ListAlbum } from '../../Types';
import { CreateVerseData } from '../../Validations';
import { defaultSong } from './defaultValues';
import Api from '../../Api';

export const useSong = (uid: string) => {
  const [song, setSong] = useState<Song>(defaultSong);

  const [albums, setAlbums] = useState<ListAlbum[]>([]);

  const [verseLoading, setVerseLoading] = useState(0);
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

        const { data: albums } = await Api.albums.fetch({
          config: { params: { 'songs.uid': uid } }
        });
        setAlbums(albums);
      } catch (error) {
        toast.error('Failed to fetch Song');
      } finally {
        setLoading(false);
      }
    })();
  }, [uid]);

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

  const del = useCallback(async () => {
    try {
      setLoading(true);
      await Api.songs.del({ id: song.uid });
      navigate('/songs');
      toast.success('Song deleted sucessfully');
    } catch (error) {
      toast.error('Failed to delete Song');
    } finally {
      setLoading(false);
    }
  }, [song, navigate]);

  const addVerse: SubmitFn<CreateVerseData> = useCallback(
    async formValues => {
      try {
        setVerseLoading(song.verses.length + 1);
        const { data } = await Api.songs.addVerse({ uid, payload: formValues });
        setSong(prev => ({ ...prev, verses: [...prev.verses, data] }));
        toast.success('Verse added sucessfully');
      } catch (err) {
        toast.error('Failed to add Verse');
      } finally {
        setVerseLoading(0);
      }
    },
    [uid, song.verses.length]
  );

  const delVerse = useCallback(
    async (number: number) => {
      try {
        setVerseLoading(number);
        const { data } = await Api.songs.delVerse({ uid, number });
        setSong(prev => ({ ...prev, verses: data }));
        toast.success('Verse deleted sucessfully');
      } catch (err) {
        toast.error('Failed to delete Verse');
      } finally {
        setVerseLoading(0);
      }
    },
    [uid]
  );

  const editVerse = useCallback(
    async (number: number, verse: Verse) => {
      try {
        setVerseLoading(number);
        const { data } = await Api.songs.editVerse({ uid, number, verse });
        setSong(prev => ({
          ...prev,
          verses: prev.verses.map(verse =>
            verse.number === number ? data : verse
          )
        }));
        toast.success('Verse edited sucessfully');
      } catch (err) {
        toast.error('Failed to edit Verse');
      } finally {
        setVerseLoading(0);
      }
    },
    [uid]
  );

  const addEditor = useCallback(
    async (userUID: string) => {
      try {
        const { data } = await Api.songs.addEditor({ uid, userUID });
        setSong(prev => ({ ...prev, editors: [...prev.editors, data] }));
        toast.success('Editor added sucessfully');
      } catch (err) {
        toast.error('Failed to add editor');
      }
    },
    [uid]
  );

  const delEditor = useCallback(
    async (userUID: string) => {
      try {
        await Api.songs.delEditor({ uid, userUID });
        setSong(prev => ({
          ...prev,
          editors: prev.editors.filter(x => x.uid !== userUID)
        }));
        toast.success('Editor removed sucessfully');
      } catch (err) {
        toast.error('Failed to remove editor');
      }
    },
    [uid]
  );

  return {
    song,
    albums,
    loading,
    del,
    updateImage,
    editors: {
      add: addEditor,
      del: delEditor
    },
    verses: {
      add: addVerse,
      del: delVerse,
      edit: editVerse,
      loading: verseLoading
    }
  };
};