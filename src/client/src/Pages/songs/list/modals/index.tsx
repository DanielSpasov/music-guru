import { Box, Modal } from '../../../../Components';
import { ModalsProps } from './helpers';
import CreateSong from './Create';

export default function Modals({ openCreate, setOpenCreate }: ModalsProps) {
  return (
    <Box>
      <Modal open={openCreate} onClose={() => setOpenCreate(false)}>
        <CreateSong onClose={() => setOpenCreate(false)} />
      </Modal>
    </Box>
  );
}
