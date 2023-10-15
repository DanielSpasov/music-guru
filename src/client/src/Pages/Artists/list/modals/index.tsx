import { Box, Modal } from '../../../../Components';
import { ModalsProps } from './helpers';
import CreateArtist from './Create';

export default function Modals({
  openCreate,
  setOpenCreate,
  fetchArtists
}: ModalsProps) {
  return (
    <Box>
      <Modal open={openCreate} onClose={() => setOpenCreate(false)}>
        <CreateArtist
          onClose={() => setOpenCreate(false)}
          fetchArtists={fetchArtists}
        />
      </Modal>
    </Box>
  );
}
