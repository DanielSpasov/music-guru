import { Modal } from '../../../../Components';
import { ModalsProps } from './helpers';
import CreateArtist from './Create';

export default function Modals({ openCreate, setOpenCreate }: ModalsProps) {
  return (
    <div>
      <Modal open={openCreate} onClose={() => setOpenCreate(false)}>
        <CreateArtist onClose={() => setOpenCreate(false)} />
      </Modal>
    </div>
  );
}
