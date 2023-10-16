import { Box, Button, Heading, Modal } from '../../../../Components';
import { ModalsProps } from './helpers';
import EditAlbum from './Edit';

export default function Modals({
  openEdit,
  setOpenEdit,
  openDel,
  setOpenDel,
  fetchAlbum,
  deleteAlbum
}: ModalsProps) {
  return (
    <Box>
      <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
        <EditAlbum onClose={() => setOpenEdit(false)} fetchAlbum={fetchAlbum} />
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
              title="Are you sure you want to delete this album."
              size="small"
            />
            <Heading title="This action cannot be undone." size="small" />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Button onClick={deleteAlbum}>Proceed</Button>
            <Button variant="secondary" onClick={() => setOpenDel(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
