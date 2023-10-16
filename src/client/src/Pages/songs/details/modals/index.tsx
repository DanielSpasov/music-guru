import { Box, Modal } from '../../../../Components';
import { ModalsProps } from './helpers';
import DeleteSong from './Delete';
import EditSong from './Edit';

export default function Modals({
  openEdit,
  setOpenEdit,
  openDel,
  setOpenDel,
  deleteSong,
  fetchSong
}: ModalsProps) {
  return (
    <Box>
      <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
        <EditSong onClose={() => setOpenEdit(false)} fetchSong={fetchSong} />
      </Modal>

      <Modal open={openDel} onClose={() => setOpenDel(false)}>
        <DeleteSong deleteSong={deleteSong} setOpenDel={setOpenDel} />
      </Modal>
    </Box>
  );
}
