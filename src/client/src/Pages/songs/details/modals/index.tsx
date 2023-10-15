import { Box, Modal } from '../../../../Components';
import { ModalsProps } from './helpers';
import EditSong from './Edit';

export default function Modals({ openEdit, setOpenEdit }: ModalsProps) {
  return (
    <Box>
      <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
        <EditSong onClose={() => setOpenEdit(false)} />
      </Modal>
    </Box>
  );
}
