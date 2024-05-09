import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { defaultArtist } from '../Pages/artists/details';
import { Song, Verse } from '../Types/Song';
import { ListAlbum } from '../Types/Album';
import Api from '../Api';

const defaultSong: Song = {
  uid: '',
  created_at: new Date(),
  created_by: '',
  features: [],
  image: '',
  name: '',
  release_date: null,
  artist: defaultArtist,
  verses: []
};

export default function useSong(uid: string) {
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

  const addVerse = useCallback<SubmitHandler<any>>(
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

  return {
    song,
    albums,
    loading,
    verseLoading,
    del,
    updateImage,
    addVerse,
    delVerse,
    editVerse
  };
}
