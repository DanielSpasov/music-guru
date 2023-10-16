import { Box, Button, Heading } from '../../../../Components';
import { DeleteSongProps } from './helpers';

export default function DeleteSong({
  deleteSong,
  setOpenDel
}: DeleteSongProps) {
  return (
    <Box>
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
  );
}
