import { Box, Button, Heading, Modal } from '../../../../Components';
import { ModalsProps } from './helpers';
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

      <Modal open={openDel} onClose={() => setOpenDel(false)} type="alert">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="100%"
        >
          <Box>
            <Heading
              title="Are you sure you want to delete this song."
              size="small"
            />
            <Heading title="This action cannot be undone." size="small" />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Button onClick={deleteSong}>Proceed</Button>
            <Button variant="secondary" onClick={() => setOpenDel(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
