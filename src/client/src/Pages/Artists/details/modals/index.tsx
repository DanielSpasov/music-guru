import { Box, Modal } from '../../../../Components';
import { ModalsProps } from './helpers';
import EditArtist from './Edit';

export default function Modals({
  openEdit,
  setOpenEdit,
  fetchArtist
}: ModalsProps) {
  return (
    <Box>
      <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
        <EditArtist
          onClose={() => setOpenEdit(false)}
          fetchArtist={fetchArtist}
        />
      </Modal>
    </Box>
  );
}
