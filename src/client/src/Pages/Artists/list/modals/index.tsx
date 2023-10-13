import { Box } from '../../../../Components';
import { ModalsProps } from './helpers';
import CreateArtist from './Create';

export default function Modals({ open, setOpen, fetchArtists }: ModalsProps) {
  return (
    <Box
      position="fixed"
      top="0"
      width="100%"
      height="100%"
      zIndex="9999"
      pointerEvents={open ? 'auto' : 'none'}
    >
      <Box
        backgroundColor="black"
        width="100%"
        height="100%"
        opacity={open ? '.75' : '0'}
      />
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        height="100%"
        display="flex"
        transform={`${open ? 'translateY(1.75em)' : 'translateY(3em)'}`}
        visibility={`${open ? '' : 'hidden'}`}
        opacity={`${open ? '1' : '0'}`}
      >
        <CreateArtist
          onClose={() => setOpen(false)}
          fetchArtists={fetchArtists}
        />
      </Box>
    </Box>
  );
}
