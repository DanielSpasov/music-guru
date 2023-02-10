import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Api from '../../../Api';
import { Box, Image, PageLayout } from '../../../Components';
import { Artist } from '../helpers';

export default function SingleArtist() {
  const [artist, setArtist] = useState<Artist>();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const { data } = await Api.artists.get({ id });
      setArtist(data);
    })();
  }, [id]);

  return (
    <PageLayout title={artist?.name || ''} loading={!artist}>
      <Box width="100%" display="flex" justifyContent="center">
        <Image src={artist?.image || ''} alt={artist?.name} width="350px" />
      </Box>
    </PageLayout>
  );
}
