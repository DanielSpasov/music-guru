import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Box, Card, Heading, Image, PageLayout } from '../../../Components';
import { errorHandler } from '../../../Handlers';
import useActions from '../useActions';
import { Single } from '../helpers';
import Api from '../../../Api';

export default function SingleSingle() {
  const [loading, setLoading] = useState<boolean>(true);
  const [single, setSingle] = useState<Single>();

  const actions = useActions({ model: 'single-single', data: single });
  const navigate = useNavigate();
  const { id = '0' } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await Api.singles.get({ id });
        setSingle(data);
      } catch (error) {
        errorHandler(error, navigate);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, navigate]);

  return (
    <PageLayout title={single?.name || ''} loading={loading} actions={actions}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        margin="0 5%"
      >
        <Image src={single?.image || ''} alt={single?.name} width="350px" />

        <Box width="100%" margin="0.5em">
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Heading title="Artist" />
              <Card
                image={single?.artist.image || ''}
                title={single?.artist.name || ''}
                onClick={() => navigate(`/artists/${single?.artist.uid}`)}
              />
            </Box>
            <Box>
              <Heading title="Featured Artists" />
            </Box>
          </Box>
        </Box>
      </Box>
    </PageLayout>
  );
}
