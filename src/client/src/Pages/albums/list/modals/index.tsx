import { Box, Modal } from '../../../../Components';
import { ModalsProps } from './helpers';
import CreateAlbum from './Create';

export default function Modals({ openCreate, setOpenCreate }: ModalsProps) {
  return (
    <Box>
      <Modal open={openCreate} onClose={() => setOpenCreate(false)}>
        <CreateAlbum onClose={() => setOpenCreate(false)} />
      </Modal>
    </Box>
  );
}
