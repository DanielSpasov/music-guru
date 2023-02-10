import { useEffect, useState } from 'react';
import { useMatches, useParams, useSearchParams } from 'react-router-dom';
import Api from '../../../Api';
import { Box, Image, Loader, PageLayout } from '../../../Components';
import { Artist } from '../helpers';

export default function SingleArtist() {
  const [artist, setArtist] = useState<Artist>();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const { data } = await Api.artists.get({ id });
      setArtist(data);
    })();
  }, []);

  return (
    <PageLayout title={artist?.name || 'Loading...'}>
      <Box width="100%" display="flex" justifyContent="center">
        {!artist && <Loader rainbow />}
        {artist && <Image src={artist.image} alt={artist.name} width="350px" />}
      </Box>
    </PageLayout>
  );
}
